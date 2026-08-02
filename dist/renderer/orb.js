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
    orb?.removeEventListener("pointermove", onPointerMove);
    orb?.removeEventListener("pointerup", endDrag);
    orb?.removeEventListener("pointercancel", endDrag);
}
orb?.addEventListener("pointerdown", () => {
    isDragging = true;
    orb?.addEventListener("pointermove", onPointerMove);
    orb?.addEventListener("pointerup", endDrag);
    orb?.addEventListener("pointercancel", endDrag);
});
