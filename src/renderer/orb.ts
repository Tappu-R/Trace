
const orb:HTMLBodyElement|null = document.querySelector(".orb")


orb?.addEventListener('mousedown', (downEvent)=>{
    orb?.addEventListener("mousemove", (moveEvent) => {
        // send the winodw OR body position to the main process to calculate the drag algorithm
    });
});
