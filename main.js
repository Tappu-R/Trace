const { app, BrowserWindow, screen, ipcMain} = require('electron')
const windowStateKeeper = require('electron-window-state')
const path = require("node:path")

let orb;
let overlay;

function createOrb () {
    let orbStateKeeper = new windowStateKeeper(orb,{
        defaultWidth: 100,
        defaultHeight:100
    })
    orb = new BrowserWindow({
        x : orbStateKeeper.x,
        y : orbStateKeeper.y,
        width: 100,
        height: 100,
        alwaysOnTop: true,
        resizable: false,
        frame: false,
        hasShadow:false,
        webPreferences: {
            devTools: true,
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(__dirname, "preload.js")
        }
    })
    
    orb.on("closed", ()=> app.quit())

    orb.loadFile('orb.html')
    orbStateKeeper.manage(orb)
}

function overlayWindow () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    overlay = new BrowserWindow({
        width: width,
        height: height,
        resizable: false,
        // transparent: true,
        hasShadow:false,
        titleBarStyle: 'hidden',
        titleBarOverlays: true,

        webPreferences : {
            devTools : false,
            contextIsolation:true,
            nodeIntegration:false
        }
    })
        
    overlay.loadFile('overlay.html')
}

ipcMain.on("openOverlay", () => {
    if (overlay && !overlay.isDestroyed()) {
        overlay.focus();
    } else {
        overlayWindow();
    }
})

app.whenReady().then(() => {
    createOrb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})