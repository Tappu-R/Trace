import {contextBridge, ipcRenderer} from 'electron';

let API = {
    openOverlay : (event:any) => {ipcRenderer.send("openOverlay", event)},
    drag : (event:any) => {ipcRenderer.send("drag", event)}
}


contextBridge.exposeInMainWorld("API",API)