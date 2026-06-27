import { app, BrowserWindow, screen, ipcMain} from 'electron'
import path from "node:path"
import type {Point} from "./engine/engine.js"
import {drag} from "./engine/engine.js"

let orb:BrowserWindow;
let overlay:BrowserWindow;
let primaryDisplay:Electron.Display ;
let width:number;
let height:number;
let currentMousePosition:Point;
let updatedMousePosition:Point = {
    Name: "Updated Mouse Position",
    x: 0,
    y: 0
}

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
            devTools: true, // Just enabled for now, baad me false kar denge
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
            preload: path.join(app.getAppPath(), "./dist/preload/OverlayPreload.ts")
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

ipcMain.on("openOverlay", (ipcEvent, event)=>{
    createOverlay()
})

ipcMain.on("drag", (ipcEvent, event)=>{
    if (event.detail === 1) {
        currentMousePosition = {
            Name: "first comming mouse position",
            x: event.clientX,
            y: event.clientY
        }
    } else {
        updatedMousePosition = currentMousePosition;
        currentMousePosition = {
            Name: "latest mouse position",
            x:event.clientX,
            y:event.clientY
        }
    }

    // Need 
    // 1> window positon
    // 2> current mouse Position
    // 3> after one move event emit mouse position

    let screenConstant:Point = {
        Name:"Orb Window Position",
        Discription: "Changes after one mouse move event emit", 
        x: orb.getPosition()[0] as number,
        y: orb.getPosition()[1] as number,
    };

    let orbPosition: Point = drag(currentMousePosition, updatedMousePosition, screenConstant)

    /// Debugging
    console.log(screenConstant)    
    console.log(orbPosition)
    console.log("____________END______________")

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

