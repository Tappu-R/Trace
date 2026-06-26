export{};

declare global {
    interface Window {
        maths : {
            dragCalc() : void
        }
        api: {
            openOverlay(): void
            onDrawingMode() : void
            offDrawingMode() : void
            mouseDownPoint(event:any) : void
        }
    }

}
