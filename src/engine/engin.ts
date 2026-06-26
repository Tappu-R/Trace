import { TupleType } from "typescript";

export interface Point {
    Name?:string;
    Discription?: string;
    x:number;
    y:number;
}

export function drag(currentMousePosition:Point, targetMousePosition:Point, screenConstant?:Point):Point {
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
        }
    }
    
    // Implementing the dragging algorithm
    const mouseDifference:Point = {
        Discription: "calculate the position where the mouse is currently and later so that ",
        x : (currentMousePosition.x - targetMousePosition.x)*screenConstant.x,
        y : (currentMousePosition.y - targetMousePosition.y)*screenConstant.y
    }
    
    const windowNewPosition:Point = {
        x : screenConstant.x + mouseDifference.x,
        y : screenConstant.y + mouseDifference.y
    };
    
    return windowNewPosition;
}