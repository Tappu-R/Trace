export interface Point {
    x:number;
    y:number;
}

let UpdatedScreenConstant:Point = {
    x : 0,
    y : 0
};

export function drag(currentMousePosition:Point, previousMousePosition:Point, screenConstant?:Point):any {
    // currentPosition is the co-ordinates of the top-left point of the object(things)
    
    // targetPosition is the co-ordinates of the new position of the object(things) where the objects top-left corner will be placed
    
    // Setting the default screen constant
    
    if (!screenConstant) {
        // This screen constant continueously changes after one move event emit
        screenConstant = {
            x: 0,
            y: 0
        }
    }
    
    // Implementing the dragging algorithm
    const mouseDifference:Point = {
        x : (currentMousePosition.x - previousMousePosition.x) ,
        y : (currentMousePosition.y - previousMousePosition.y)
    }

    // updating screenConstant values
    UpdatedScreenConstant = {
        x : screenConstant.x + mouseDifference.x,
        y : screenConstant.y + mouseDifference.y
    }
    
    const windowNewPosition:Point = {
        x : screenConstant.x + mouseDifference.x,
        y : screenConstant.y + mouseDifference.y
    };

    const points = [
        `Screen Constant {x : ${screenConstant.x}, y : ${screenConstant.y}}`,
        `mouseDifference {x : ${mouseDifference.x}, y : ${mouseDifference.y}}`,
        `windowNewPosition {x : ${windowNewPosition.x}, y : ${windowNewPosition.y}}`
    ]

    // return points;
    return windowNewPosition;
}

export function updateScreenConstant() : Point {
    return UpdatedScreenConstant
}

