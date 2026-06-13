import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld("api", {
    openOverlay : () => {ipcRenderer.send("openOverlay")}
})

contextBridge.exposeInMainWorld("maths", {
    dragCalc : () => {ipcRenderer.send("dragCalc")}
})