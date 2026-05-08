const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
    const orbWindow = new BrowserWindow({
        width:80,
        height:80,
        frame:false,
        // transparent:true,
        alwaysOnTop:true,
        resizable:false,
    
        hasShadow:false,
        
        webPreferences: {
            devTools:false,
            nodeIntegration:true,
            contextIsolation:false
        }
        
    })
    orbWindow.loadFile('index.html')
})
