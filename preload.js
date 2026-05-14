const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld("api", {
    openOverlay : () => {ipcRenderer.send("openOverlay")}
})