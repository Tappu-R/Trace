import { app, BrowserWindow } from 'electron';
import path from "node:path";
let window;
function createWindow() {
    window = new BrowserWindow({
        width: 50,
        height: 50,
        alwaysOnTop: true,
        transparent: true,
        resizable: true,
        frame: false,
        hasShadow: false,
        webPreferences: {
            devTools: true,
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(app.getAppPath(), "./dist/preload.js")
        }
    });
    window.on("closed", () => app.quit());
    window.loadFile('./src/renderer/html/main.html');
}
app.whenReady().then(() => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
