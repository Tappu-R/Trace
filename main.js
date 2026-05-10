const { app, BrowserWindow, screen } = require('electron')

function createOrb () {
    const orb = new BrowserWindow({
        width: 60,
        height: 60,
        alwaysOnTop: true,
        resizable: false,
        frame: false
    })
    orb.loadFile('orb.html')
}

function overlayWindow () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const overlay = new BrowserWindow({
        width: width,
        height: height,
        resizable: false,
        transparent: true,

        titleBarStyle: 'hidden',
        titleBarOverlays: true
    })
        
    overlay.loadFile('overlay.html')
    overlay.webContents.openDevTools()
}


app.whenReady().then(() => {
    createOrb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})