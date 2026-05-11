const { app, BrowserWindow, screen } = require('electron')
const windowStateKeeper = require('electron-window-state')

let orb;
let overlay;

function createOrb () {
    let orbStateKeeper = new windowStateKeeper(orb,{
        defaultWidth: 200,
        defaultHeight:200
    })
    orb = new BrowserWindow({
        x : orbStateKeeper.x,
        y : orbStateKeeper.y,
        width: orbStateKeeper.width,
        height: orbStateKeeper.height,
        // alwaysOnTop: true,
        resizable: false,
        frame: true,
    
        webPreferences: {
            devTools:true
        }
    })
    orb.loadFile('orb.html')
    orbStateKeeper.manage(orb)
}

function overlayWindow () {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    overlay = new BrowserWindow({
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