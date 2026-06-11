import { app, BrowserWindow, screen, ipcMain} from 'electron'
import path from "node:path"

let orb:BrowserWindow;

function createOrb () {
    orb = new BrowserWindow({
        width: 50,
        height: 50,
        alwaysOnTop: true,

        resizable: true,
        frame: false,
        hasShadow:false,
        webPreferences: {
            devTools: true,
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(app.getAppPath(), "./dist/preload.js")
        }
    }) 
    
    orb.on("closed", ()=> app.quit())
    orb.loadFile('./html/orb.html')
}


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