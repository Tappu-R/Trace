"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let API = {
    openOverlay: () => { electron_1.ipcRenderer.send("openOverlay"); },
    drag: (mousePosition) => { electron_1.ipcRenderer.send("drag", mousePosition); }
};
electron_1.contextBridge.exposeInMainWorld("API", API);
