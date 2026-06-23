
const orb:HTMLBodyElement|null = document.querySelector(".orb")

orb?.addEventListener('click', (event)=>{
    window.api.onDrawingMode();
})
