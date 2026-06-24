import { app, BrowserWindow, screen, ipcMain} from 'electron'
import { log } from 'node:console';
import path from "node:path"

let orb:BrowserWindow;
let overlay:BrowserWindow;
let primaryDisplay:Electron.Display ;
let width:number;
let height:number;

function createOrb () {
    orb = new BrowserWindow({
        width: Math.floor(width/20),
        height: Math.floor(height/10),

        alwaysOnTop: true,
        transparent: false,
        resizable: true,
        frame: false,
        hasShadow:false,

        webPreferences: {
            devTools: true, // Just enabled for now bad me false kar denge
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(app.getAppPath(), "./dist/preload/MainPreload.js")
        }
    }) 
    
    orb.on("closed", ()=> app.quit())
    orb.loadFile('./src/renderer/html/main.html')
}

function createOverlay () {
    overlay = new BrowserWindow({
        width: width,
        height: height,
        
        resizable: false,
        frame:false,
        transparent:true,

        webPreferences: {
            devTools: true, // Just for now, Disable it for security
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(__dirname, "./dist/preload/OverlayPreload.ts")
        }
    })

    overlay.loadFile("./src/renderer/html/overlay.html")
}

app.whenReady().then(() => {
    primaryDisplay = screen.getPrimaryDisplay();
    width = primaryDisplay.workAreaSize.width;
    height = primaryDisplay.workAreaSize.height;
    createOrb()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

ipcMain.addListener("onDrawingMode", ()=>{
    if (!overlay || overlay.isDestroyed()) {
        createOverlay()
    } else {
        overlay.close()
    }
    
})

ipcMain.addListener("offDrawingMode", ()=> {
    if (overlay){
        overlay.close()
    }
})


