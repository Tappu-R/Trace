"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orb = document.querySelector(".orb");
orb?.addEventListener('click', (event) => {
    window.api.onDrawingMode();
});
