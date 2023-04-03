const sv: {
	[key: string]: string
} = {
	loginEmailPlaceholder: "E-postadress",
	loginPasswordPlaceholder: "Lösenord",
	loginTwoFactorCodePlaceholder: "Tvåfaktorskod",
	loginBtn: "Logga in",
	titlebarLogin: "Logga in",
	loginInvalidFields: "Ogiltliga fält",
	loginInvalidEmail: "Ogiltig e-postadress",
	loginInvalidEmailOrPassword: "Ogiltlig e-postadress eller lösenord",
	loginAccountNotYetActivated: "Kontot är ännu inte aktiverat",
	loginWrongEmailOrPassword: "Felaktig e-postadress eller lösenord",
	invalidTwoFactorKey: "Felaktig tvåfaktorskod",
	titlebarMain: "Filen",
	titlebarSettings: "Inställningar",
	titlebarSelectFolderRemote: "Välj en moln-mapp",
	titlebarDownload: "Ladda ner",
	titlebarCloud: "Moln",
	titlebarUpload: "Ladda upp",
	titlebarSelectiveSync: "Selektiv synkronisering",
	close: "Stäng",
	save: "Spara",
	syncingItemsFooterSingular: "Synkroniserar __COUNT__ objekt",
	syncingItemsFooterPlural: "Synkroniserar __COUNT__ objekt",
	syncingFooterEverythingSynced: "Allting är synkroniserat",
	aboutRemaining: "Ungefär __TIME__ återstående",
	noSyncActivityYet: "Ingen aktivitet än",
	createOne: "Skapa en",
	noSyncLocationsSetupYet: "Ingen synkroniseringsplats har skapats än",
	storageUsed: "__USED__ använt av __MAX__",
	quitFilen: "Stäng Filen",
	openWebsite: "Öppna webbsida",
	settings: "Inställningar",
	actions: "Åtgärder",
	youAreOffline: "Du är offline",
	forgotPasswordBtn: "Glömt lösenord",
	createAccountBtn: "Skapa konto",
	select: "Välj",
	thisFolderIsEmpty: "Denna mapp är tom",
	createFolder: "Skapa mapp",
	create: "Skapa",
	downloadDone: "Nedladdning färdig",
	openFolder: "Öppna mapp",
	download: "Ladda ner",
	change: "Ändra",
	open: "Öppna",
	noFilesOrFoldersUploadedYet: "Inga filer eller mappar har laddats upp",
	uploadDone: "Uppladdning färdig",
	preparingUpload: "Förbereder...",
	preparingUploadFolders: "Skapar mappstrukturen..",
	launchAtSystemStartup: "Öppna vid systemstart",
	darkMode: "Mörkt tema",
	excludeDot: "Excludera punkt-filer och mappar (rekommenderas)",
	excludeDotTooltip: 'Excludera filer och mappar som börjar med en punkt, exempelvis ".gitignore, .DS_Store"',
	language: "Språk",
	saveLogs: "Spara loggar",
	cannotCreateSyncLocation: "Kunde ej skapa synkroniseringsplats",
	cannotCreateSyncLocationSubdir: "Du måste välja minst en underkatalog",
	cannotCreateSyncLocationLoop:
		"Den lokala platsen du har valt är redan en konfigurerad synkroniseringsplats. Detta kan leda till en oändlig synkroniserings-loop",
	cannotCreateSyncLocationAccess: "Kunde ej komma åt lokala mappen. Saknar du behörighet?",
	selectRemoteLocation: "Välj filplats i molnet",
	syncMode: "Synkroniseringsläge",
	syncModeTwoWay: "Tvåvägssynkronisering",
	syncModeLocalToCloud: "Lokalt till Moln",
	syncModeCloudToLocal: "Moln till Lokalt",
	syncModeLocalBackup: "Lokal backup",
	syncModeCloudBackup: "Moln backup",
	selectiveSync: "Selektiv synkronisering",
	selectiveSyncTooltip: "Välj vilka mappar och filer som du vill ha synkroniserade lokalt",
	configure: "Konfigurera",
	filenignoreTooltip: "Exkludera filsökvägar och mönster från synkronisering. Fungerar precis som en .gitignore fil",
	edit: "Redigera",
	paused: "Pausad",
	deleteSyncLocation: "Radera synkroniseringsplats",
	confirmDeleteSyncLocation: "Är du säker att du vill radera denna synkroniseringsplats?",
	delete: "Radera",
	filenignoreHeader: "Ignorerat mönster, separerat av ny linje",
	accountStorageUsed: "__PERCENT__% av __MAX__ använt",
	logout: "Logga ut",
	accountCurrentPlan: "Nuvarande plan",
	accountUpgrade: "Uppgradera",
	accountStorageInUse: "__PERCENT__% används",
	confirmLogout: "Är du säker att du vill logga ut?",
	resumeSyncing: "Återuppta synkronisering",
	noSyncIssues: "Inga synkroniseringsproblem",
	clearSyncIssues: "Rensa problem",
	clearSyncIssuesInfo:
		"När du rensar de problem som visas, så kommer klienten försöka synkronisera igen. Var god bekräfta att du har löst alla problem innan du rensar dem.",
	clear: "Rensa",
	uploadBandwidthThrottling: "Begränsning av bandbredd för uppladdning",
	unlimited: "Obegränsat",
	downloadBandwidthThrottling: "Begränsning av bandbredd för nedladdning",
	networkThrottling: "Nätverksbegränsning",
	maximumUploadBandwidth: "Maximal bandbredd för uppladdning (i Kbps)",
	maximumDownloadBandwidth: "Maximal bandbredd för nedladdning (i Kbps)",
	disableThrottlingInfo: "Om du anger ett värde på 0 avaktiveras bandbreddsbegränsning",
	resetToDefaults: "Återställ till standard",
	changeKeybind: "Ändra nyckelbindning",
	pressKeyOrCombo: "Tryck på valfri tangent eller tangentkombination",
	settingsGeneral: "Allmänt",
	settingsSyncs: "Synkroniseringar",
	settingsAccount: "Konto",
	settingsIssues: "Problem",
	settingsNetworking: "Nätverk",
	settingsKeybinds: "Nyckelbindningar",
	createFolderPlaceholder: "Mapp namn",
	invalidFolderName: "Ogiltigt mapp namn",
	titlebarCloudWindow: "Moln",
	updateAvailable:
		"Det finns en tillgänglig uppdatering, överväg att ladda ner den senaste versionen för buggfixar och prestandaförbättringar",
	downloadUpdateBtn: "Ladda ner uppdatering",
	pause: "Pausa",
	resume: "Återuppta",
	keybinds_uploadFolders: "Ladda upp mappar",
	keybinds_uploadFiles: "Ladda upp filer",
	keybinds_openSettings: "Öppna inställningar",
	keybinds_pauseSync: "Pausa synkronisering",
	keybinds_resumeSync: "Återuppta synkronisering",
	keybinds_openWebsite: "Öppna webbsida",
	keybindNotBound: "Ej bunden",
	syncing: "Synkroniserar...",
	maxStorageReached:
		"Du har uppnått din maximala lagringsgräns. Vi rekommenderar att du uppgraderar ditt konto för att kunna fortsätta synkronisera.",
	syncTaskDownloadFromRemote: "Nedladdat från molnet",
	syncTaskUploadToRemote: "Uppladdat till molnet",
	syncTaskRenameInRemote: "Omdöpt i moln",
	syncTaskRenameInLocal: "Omdöpt lokalt",
	syncTaskMoveInRemote: "Flyttat i moln",
	syncTaskMoveInLocal: "Flyttat lokalt",
	syncTaskDeleteInRemote: "Raderat i moln",
	syncTaskDeleteInLocal: "Raderat lokalt",
	queued: "I kö",
	acquiringSyncLock: "Skaffar synklås...",
	syncLocationCreated: "Synkroniseringsplats skapad. För att starta synkroniseringen måste du återuppta den.",
	checkingChanges: "Kontrollerar ändringar...",
	syncModeTwoWayInfo: "Spegla varje handling i båda riktningarna",
	syncModeLocalToCloudInfo: "Spegla varje handling som görs lokalt till molnet, men agera aldrig på ändringar i molnet",
	syncModeCloudToLocalInfo: "Spegla varje handling lokalt som görs i molnet, men agera aldrig på lokala ändringar",
	syncModeLocalBackupInfo: "Ladda endast upp data till molnet, radera aldrig något och agera inte på ändringar i molnet",
	syncModeCloudBackupInfo: "Ladda endast ner data från molnet, radera aldrig något och agera inte på lokala ändringar",
	cancel: "Avbryt",
	cannotCreateSyncLocationLoop2:
		"Moln-platsen du har valt är redan en vald synkroniseringsplats. Detta kan leda till en oändlig synkroniserings-loop",
	titlebarUpdateAvailable: "En uppdatering finns tillgänglig",
	updateWindowInfo:
		"En ny version har laddats ner och är redo att bli installerad. Vänligen installera snarast möjligt, för att kunna utnyttja buggfixar och nya funktioner.",
	updateWindowButton: "Installera",
	updateWindowInfo2: "Appen kommer stängas för att påbörja uppdateringen. Vänligen avbryt inte denna process.",
	titlebarUpdateInstalled: "Uppdateringen har installerats"
}

export default sv
