"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("api", {
    openOverlay: () => { electron_1.ipcRenderer.send("openOverlay"); }
});
electron_1.contextBridge.exposeInMainWorld("maths", {
    dragCalc: () => { electron_1.ipcRenderer.send("dragCalc"); }
});
