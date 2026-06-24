import { TupleType } from "typescript";

export interface Point {
    Name?:string;
    x:number;
    y:number;
}

export function drag(currentPosition:Point, targetPosition:Point):Point {
    // currentPosition is the co-ordinates of the top-left point of the object(things)
    
    // targetPosition is the co-ordinates of the new position of the object(things) where the objects top-left corner will be placed
    
    const newPosition:Point = {
        Name : "Thing", 
        x : currentPosition.x - targetPosition.x,
        y : currentPosition.y - targetPosition.y
    };
    
    return newPosition;
}
const curr:Point = {
    Name : "current",
    x : 0,
    y : 9
}
const prev:Point = {
    Name : "current",
    x : 0,
    y : 6
}
console.log(drag(curr, prev))