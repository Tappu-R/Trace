import {contextBridge, ipcRenderer} from 'electron';
interface Point {
    Name?:string,
    x: number,
    y: number
}

let API = {
    openOverlay : () => {ipcRenderer.send("openOverlay")},
    drag : (mousePosition:Point) => {ipcRenderer.send("drag", mousePosition)}
}

contextBridge.exposeInMainWorld("API",API)