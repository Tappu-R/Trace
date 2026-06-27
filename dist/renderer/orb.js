"use strict";
const orb = document.querySelector("body");
orb?.addEventListener("click", (dragClickEvent) => {
    orb.addEventListener("mousemove", (dragMoveEvent) => {
        window.API.drag(dragMoveEvent);
    });
});
