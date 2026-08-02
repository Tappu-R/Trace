const orb = document.querySelector<HTMLElement>("body")

interface Point {
    x: number,
    y: number
}

let isDragging = false

function onPointerMove(event: PointerEvent) {
    if (!isDragging) {
        return
    }

    const mousePosition: Point = {
        x: event.clientX,
        y: event.clientY
    }

    window.API.drag(mousePosition)
}

function endDrag() {
    isDragging = false
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", endDrag)
    window.removeEventListener("pointercancel", endDrag)
}

orb?.addEventListener("pointerdown", () => {
    isDragging = true
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", endDrag)
    window.addEventListener("pointercancel", endDrag)
})
