const { app, BrowserWindow, screen, ipcMain} = require('electron')
const path = require("node:path")

let orb;
let overlay;

function createOrb () {
    orb = new BrowserWindow({
        width: 50,
        height: 50,
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

ipcMain.on("openOverlay", (event) => {
    if (overlay && !overlay.isDestroyed()) {
        overlay.focus();
    } else {
        overlayWindow();
    }
})

ipcMain.on("drag", (event, posX, posY) => {
    orb.setPosition(posX, posY)
})

app.whenReady().then(() => {
    createOrb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})