import { app, BrowserWindow, screen, ipcMain} from 'electron'
import path from "node:path"
import type {Point} from "./engine/engine.js"
import {drag, updateScreenConstant} from "./engine/engine.js"

let orb:BrowserWindow;
let overlay:BrowserWindow;
let primaryDisplay:Electron.Display ;
let width:number;
let height:number;
let screenConstant:Point;

function createOrb () {
    orb = new BrowserWindow({
        width: Math.floor(width/10),
        height: Math.floor(height/10),
        
        // x: 1,
        // y: 1,

        alwaysOnTop: true,
        transparent: false,
        resizable: false,
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
    
    orb.loadFile(path.join(app.getAppPath(), "dist/renderer/orb.html"))
}

function createOverlay () {
    overlay = new BrowserWindow({
        width: width,
        height: height,
        
        resizable: false,
        frame:false,
        transparent:false,

        webPreferences: {
            devTools: true, // Just for now, Disable it for security
            contextIsolation:true,
            nodeIntegration:false,
            preload: path.join(app.getAppPath(), "./dist/preload/OverlayPreload.js")
        }
    })
    overlay.loadFile(path.join(app.getAppPath(), "dist/renderer/html/index.html"))
    
}

app.whenReady().then(() => {

    primaryDisplay = screen.getPrimaryDisplay();
    width = primaryDisplay.workAreaSize.width;
    height = primaryDisplay.workAreaSize.height;

    
    // NOTE: Orb process work
    
    // // for debugging only
    // console.log(width, height)

    // createOrb() // Created the orb object  
    // screenConstant = {
    //     x: orb.getPosition()[0] as number,
    //     y: orb.getPosition()[1] as number,
    // };

    // console.log(screenConstant)


    // NOTE: overylay process work
    createOverlay()

})

ipcMain.on("openOverlay", (ipcEvent)=>{
    createOverlay()
})


let previousMousePosition: Point | undefined
let currentMousePosition: Point | undefined
let orbPosition : Point

function draging(mousePosition:any){
    if (!currentMousePosition) {
        currentMousePosition = {
            x: mousePosition.x,
            y: mousePosition.y
        }
        previousMousePosition = { ...currentMousePosition }
        return
    }

    previousMousePosition = currentMousePosition
    currentMousePosition = {
        x: mousePosition.x,
        y: mousePosition.y
    }

    // Need 
    // 1> window positon
    // 2> current mouse Position
    // 3> after one move event emit mouse position

    orbPosition = drag(currentMousePosition, previousMousePosition, screenConstant)
    
    orb.setPosition(Math.floor(orbPosition.x), Math.floor(orbPosition.y))
    /// Debugging 
    console.log(`screenConstantBefore {x : ${screenConstant.x}, y : ${screenConstant.y}}`)
    console.log(`orbNewPosition {x : ${orbPosition.x}, y : ${orbPosition.y}}`)

    // updating screenConstant
    screenConstant = updateScreenConstant()

    console.log(`screenConstantAfter {x : ${screenConstant.x}, y : ${screenConstant.y}}`)
    console.log("____________END______________")

}

ipcMain.on("drag", (ipcEvent, mousePosition)=>{
    // draging(mousePosition)
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

ipcMain.on("onDrawingMode", ()=>{
    if (!overlay || overlay.isDestroyed()) {
        createOverlay()
    } else {
        overlay.close()
    }
})

ipcMain.on("offDrawingMode", ()=> {
    if (overlay){
        overlay.close()
    }
})
