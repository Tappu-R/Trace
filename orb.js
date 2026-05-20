// const body = document.querySelector('body')

const openOverlayWindow = (event) => {
    window.api.openOverlay()
}

// opening the overlay panel
window.addEventListener("dblclick", (event) => {
    openOverlayWindow(event)
})

window.addEventListener("mousedown", (eventParent) => {
    const deltaX = eventParent.screenX - window.screenX
    const deltaY = eventParent.screenY - window.screenY
    
    console.log("dblclickEvent", eventParent)

    const onMove = (event) => {
        console.log("moveEvent", event)
        window.api.drag(event.screenX - deltaX, event.screenY - deltaY)
        
    }

    const stopDrag = (event) => {
        console.log("stopDrag")
        window.removeEventListener("mousemove", onMove)
        window.removeEventListener("mouseup", stopDrag)
    }
    
    if (eventParent.detail === 1){
        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseup", stopDrag)
    }
    
})

