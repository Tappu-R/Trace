// const body = document.querySelector('body')

const openOverlayWindow = (event) => {
    window.api.openOverlay()
}

// opening the overlay panel
window.addEventListener("dblclick", (event) => {
    openOverlayWindow(event)
})

window.addEventListener("mousedown", (eventParent) => {
    const windowX = window.screenX
    const windowY = window.screenY
    const eventPointerX = eventParent.screenX
    const eventPointerY = eventParent.screenY
    const xDifference = eventPointerX - windowX
    const yDifference = eventPointerY - windowY
    const newPoseX = (eventPointerX - xDifference) + windowX
    const newPoseY = (eventPointerY - yDifference) + windowY
    
    console.log("eventParent", eventParent)

    const onMove = (event) => {
        console.log("moveEvent", event)
        window.api.drag(newPoseX, newPoseY)
        
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

