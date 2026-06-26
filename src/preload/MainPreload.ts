import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld("api", {
    openOverlay : () => {ipcRenderer.send("openOverlay")},
    onDrawingMode: () => {ipcRenderer.send("onDrawingMode")},
    offDrawingMode: () => {ipcRenderer.send("offDrawingMode")},
    mouseDownPoint : () => {ipcRenderer.send("drag")}
})

contextBridge.exposeInMainWorld("maths", {
    dragCalc : () => {ipcRenderer.send("dragCalc")}
})