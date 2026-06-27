"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
let API = {
    openOverlay: (event) => { electron_1.ipcRenderer.send("openOverlay", event); },
    drag: (event) => { electron_1.ipcRenderer.send("drag", event); }
};
electron_1.contextBridge.exposeInMainWorld("API", API);
