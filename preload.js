const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld("api", {
    openOverlay : () => {ipcRenderer.send("openOverlay")},
    
    drag : (posX, posY) => {
        ipcRenderer.send("drag", posX, posY)
    }
})