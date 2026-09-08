let Body = document.body

document.addEventListener("mousedown", (event) => {
    Body.classList.add("drag")
})

document.addEventListener("mouseup", (event) => {
    Body.classList.remove("drag")
})
