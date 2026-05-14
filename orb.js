const body = document.querySelector('body')

// Mechanism
// double mousedown par draging function invoked
// double mousedown ke bad ke wale mouseup par posintion ko restore kar 
// upar wala step sayad electron-window-state module se ho jaye to mouseup ka use karne ki naubat na aaye
// single click pe overlay open kar dega

let stPosisionX;
let stPosisionY;

// opening the overlay panel
body.addEventListener("click", (event) => {
    window.api.openOverlay()
})

// draging logic here exist
function dragMe (event) {
    
}
