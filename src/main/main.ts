import { app, BrowserWindow, screen, ipcMain} from 'electron'
import path from "node:path"

let window:BrowserWindow;

function createWindow () {
    const primaryDisplay:Electron.Display = screen.getPrimaryDisplay();
    const width:number = primaryDisplay.workAreaSize.width;
    const height:number = primaryDisplay.workAreaSize.height;
    window = new BrowserWindow({
        width: width,
        height: height,

        alwaysOnTop: true,
        transparent: true,
        resizable: true,
        frame: false,
        hasShadow:false,
        webPreferences: {
            devTools: true,
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(app.getAppPath(), "./dist/preload/preload.js")
        }
    }) 
    
    window.on("closed", ()=> app.quit())
    window.loadFile('./src/renderer/html/main.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

ipcMain.addListener("onDrawingMode", ()=>{
    window.setIgnoreMouseEvents(false)
})

ipcMain.addListener("offDrawingMode", ()=> {
    if (!window.setIgnoreMouseEvents){
        window.setIgnoreMouseEvents(true)
    }
})




