"use strict";
const orb = document.querySelector("body");
let isDragging = false;
function onPointerMove(event) {
    if (!isDragging) {
        return;
    }
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    window.API.drag(mousePosition);
}
function endDrag() {
    isDragging = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
}
orb?.addEventListener("pointerdown", () => {
    isDragging = true;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
});
