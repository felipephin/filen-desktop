import ipc from "../../ipc"
import memoryCache from "../../memoryCache"
import { convertTimestampToMs, Semaphore } from "../../helpers"
import { downloadChunk } from "../../api"
import { decryptData } from "../../crypto"
import { v4 as uuidv4 } from "uuid"
import db from "../../db"
import * as constants from "../../constants"
import { isSyncLocationPaused } from "../../worker/sync/sync.utils"
import { Stats } from "fs-extra"
import { LocalDirectoryTreeResult, Location } from "../../../../types"

const fs = window.require("fs-extra")
const pathModule = window.require("path")
const log = window.require("electron-log")
const { ipcRenderer } = window.require("electron")

const downloadThreadsSemaphore = new Semaphore(constants.maxDownloadThreads)

export const normalizePath = (path: string): string => {
    return pathModule.normalize(path)
}

export const checkLastModified = async (path: string): Promise<{ changed: boolean, mtimeMs?: number }> => {
    return await ipcRenderer.invoke("fsCheckLastModified", path)
}

export const getTempDir = async (): Promise<string> => {
    if(memoryCache.has("tmpDir")){
        return memoryCache.get("tmpDir")
    }

    const tmpDirRes = await ipc.getAppPath("temp")
    const tmpDir = normalizePath(tmpDirRes)

    memoryCache.set("tmpDir", tmpDir)

    return tmpDir
}

export const smokeTest = async (path: string): Promise<void> => {
    return await ipcRenderer.invoke("fsSmokeTest", path)
}

export interface StatsIPC extends Stats {
    isLink: boolean,
    isDir: boolean,
    file: boolean
}

export const gracefulLStat = async (path: string): Promise<StatsIPC> => {
    return await ipcRenderer.invoke("fsGracefulLStat", path)
}

export const exists = async (path: string): Promise<boolean> => {
    return await ipcRenderer.invoke("fsExists", path)
}

export const canReadWriteAtPath = async (path: string): Promise<boolean> => {
    return await ipcRenderer.invoke("fsCanReadWriteAtPath", path)
}

export const canReadAtPath = async (path: string): Promise<boolean> => {
    return await ipcRenderer.invoke("fsCanReadAtPath", path)
}

export const directoryTree = async (path: string, skipCache: boolean = false, location: Location): Promise<LocalDirectoryTreeResult> => {
    return await ipcRenderer.invoke("fsDirectoryTree", {
        path,
        skipCache,
        location
    }) 
}

export const readChunk = async (path: string, offset: number, length: number): Promise<Buffer> => {
    return await ipcRenderer.invoke("fsReadChunk", {
        path,
        offset,
        length
    })
}

export const rm = async (path: string, location: Location): Promise<void> => {
    return await ipcRenderer.invoke("fsRm", {
        path,
        location
    })
}

export const rmPermanent = async (path: string): Promise<void> => {
    return await ipcRenderer.invoke("fsRmPermanent", path)
}

export const mkdir = async (path: string, location: any): Promise<any> => {
    return await ipcRenderer.invoke("fsMkdir", {
        path,
        location
    })
}

export const utimes = async (path: string, atime: number, mtime: number): Promise<void> => {
    return await ipcRenderer.invoke("fsUtimes", {
        path,
        atime,
        mtime
    }) 
}

export const unlink = async (path: string): Promise<void> => {
    return await ipcRenderer.invoke("fsUnlink", path)
}

export const remove = async (path: string): Promise<void> => {
    return await ipcRenderer.invoke("fsRemove", path)
}

export const download = (path: string, location: any, task: any): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        await new Promise((resolve) => {
            const getPausedStatus = () => {
                Promise.all([
                    db.get("paused"),
                    isSyncLocationPaused(location.uuid)
                ]).then(([paused, locationPaused]) => {
                    if(paused || locationPaused){
                        return setTimeout(getPausedStatus, 1000)
                    }

                    return resolve(true)
                }).catch((err) => {
                    log.error(err)

                    return setTimeout(getPausedStatus, 1000)
                })
            }

            return getPausedStatus()
        })

        try{
            var absolutePath = normalizePath(pathModule.join(location.local, path))
            var file = task.item
        }
        catch(e){
            return reject(e)
        }

        getTempDir().then((tmpDir) => {
            try{
                var fileTmpPath = normalizePath(pathModule.join(tmpDir, uuidv4()))
            }
            catch(e){
                return reject(e)
            }

            Promise.all([
                rmPermanent(absolutePath),
                rmPermanent(fileTmpPath)
            ]).then(async () => {
                try{
                    var stream = fs.createWriteStream(fileTmpPath)
                }
                catch(e){
                    return reject(e)
                }

                const fileChunks = file.chunks
                let currentWriteIndex = 0

                const downloadTask = (index: number): Promise<{ index: number, data: Buffer }> => {
                    return new Promise((resolve, reject) => {
                        downloadChunk({ 
                            region: file.region,
                            bucket: file.bucket,
                            uuid: file.uuid,
                            index,
                            from: "sync",
                            location
                        }).then((data) => {
                            decryptData(data, file.metadata.key, file.version).then((decrypted) => {
                                return resolve({
                                    index,
                                    data: Buffer.from(decrypted)
                                })
                            }).catch(reject)
                        }).catch(reject)
                    })
                }

                const writeChunk = (index: number, data: Buffer) => {
                    if(index !== currentWriteIndex){
                        return setTimeout(() => {
                            writeChunk(index, data)
                        }, 10)
                    }

                    stream.write(data, (err: any) => {
                        if(err){
                            return reject(err)
                        }

                        currentWriteIndex += 1

                        return true
                    })
                }

                try{
                    await new Promise((resolve, reject) => {
                        let done = 0

                        for(let i = 0; i < fileChunks; i++){
                            downloadThreadsSemaphore.acquire().then(() => {
                                downloadTask(i).then(({ index, data }) => {
                                    writeChunk(index, data)

                                    done += 1

                                    downloadThreadsSemaphore.release()

                                    if(done >= fileChunks){
                                        return resolve(true)
                                    }
                                }).catch((err) => {
                                    downloadThreadsSemaphore.release()

                                    return reject(err)
                                })
                            })
                        }
                    })

                    await new Promise((resolve) => {
                        if(currentWriteIndex >= fileChunks){
                            return resolve(true)
                        }

                        const wait = setInterval(() => {
                            if(currentWriteIndex >= fileChunks){
                                clearInterval(wait)

                                return resolve(true)
                            }
                        }, 10)
                    })

                    await new Promise((resolve, reject) => {
                        stream.close((err: any) => {
                            if(err){
                                return reject(err)
                            }

                            return resolve(true)
                        })
                    })
                }
                catch(e){
                    unlink(fileTmpPath).catch(console.error)

                    return reject(e)
                }

                const now = new Date().getTime()
                const lastModified = convertTimestampToMs(typeof file.metadata.lastModified == "number" ? file.metadata.lastModified : now)
                const utimesLastModified = typeof lastModified == "number" && lastModified > 0 && now > lastModified ? lastModified : (now - 60000)

                move(fileTmpPath, absolutePath).then(() => {
                    utimes(absolutePath, new Date(utimesLastModified).getTime(), new Date(utimesLastModified).getTime()).then(() => {
                        checkLastModified(absolutePath).then(() => {
                            gracefulLStat(absolutePath).then((stat: any) => {
                                if(stat.size <= 0){
                                    rmPermanent(absolutePath)
            
                                    return reject(new Error(absolutePath + " size = " + stat.size))
                                }
                                
                                return resolve(stat)
                            }).catch(reject)
                        }).catch(reject)
                    }).catch(reject)
                }).catch(reject)
            }).catch(reject)
        }).catch(reject)
    })
}

export const move = async (before: string, after: string, overwrite: boolean = true): Promise<void> => {
    return await ipcRenderer.invoke("fsMove", {
        before,
        after,
        overwrite
    })
}

export const rename = async (before: string, after: string): Promise<void> => {
    return await ipcRenderer.invoke("fsRename", {
        before,
        after
    })
}

export const createLocalTrashDirs = async (): Promise<void> => {
    return await ipcRenderer.invoke("fsCreateLocalTrashDirs")
}

export const clearLocalTrashDirs = async (clearNow: boolean = false): Promise<void> => {
    return await ipcRenderer.invoke("fsClearLocalTrashDirs", clearNow)
}

export const initLocalTrashDirs = () => {
    ipcRenderer.invoke("fsInitLocalTrashDirs", constants.clearLocalTrashDirsInterval).catch(console.error)
}

export const isFileBusy = async (path: string): Promise<boolean> => {
    return await ipcRenderer.invoke("fsIsFileBusy", path)
}

export const mkdirNormal = async (path: string, options = { recursive: true }): Promise<void> => {
    return await ipcRenderer.invoke("fsMkdirNormal", {
        path,
        options
    })
}

export const access = async (path: string, mode: any): Promise<void> => {
    return await ipcRenderer.invoke("fsAccess", {
        path,
        mode
    })
}

export const appendFile = async (path: string, data: Buffer | string, options: any = undefined): Promise<void> => {
    return await ipcRenderer.invoke("fsAppendFile", {
        path,
        data,
        options
    })
}