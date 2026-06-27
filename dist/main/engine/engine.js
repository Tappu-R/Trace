export function drag(currentMousePosition, targetMousePosition, screenConstant) {
    // currentPosition is the co-ordinates of the top-left point of the object(things)
    // targetPosition is the co-ordinates of the new position of the object(things) where the objects top-left corner will be placed
    // Setting the default screen constant
    if (!screenConstant) {
        // This screen constant continueously changes after one move event emit
        screenConstant = {
            Name: "Screen Constant",
            Discription: "Position of window wrt screen",
            x: 1,
            y: 1
        };
    }
    // Implementing the dragging algorithm
    const mouseDifference = {
        Discription: "calculate the position where the mouse is currently and later so that ",
        x: (currentMousePosition.x - targetMousePosition.x) * screenConstant.x,
        y: (currentMousePosition.y - targetMousePosition.y) * screenConstant.y
    };
    const windowNewPosition = {
        Discription: `mouse Difference ${mouseDifference}, screenConstant ${screenConstant}`,
        x: screenConstant.x + mouseDifference.x,
        y: screenConstant.y + mouseDifference.y
    };
    return windowNewPosition;
}
