const openOverlayWindow = (event) => {
    // window.api.openOverlay()
    console.log("hlle");
    event;
};
const coordinates = () => {
};
// opening the overlay panel
window.addEventListener("dblclick", (event) => {
    openOverlayWindow(event);
});
export {};
// Helper code for understanding coordinates of the web 
// document.addEventListener("click", (event)=>{
//     console.log("offsetX",event.offsetX)
//     console.log("offsetY",event.offsetY)
//     console.log("screenX",event.screenX)
//     console.log("screenY",event.screenY)
//     console.log("clientX", event.clientX)
//     console.log("clientY", event.clientY)
//     console.log("----------END-------------")
// })
