export {};

declare global {
    interface window {
        api : {
            openOverlay() : void
        }

        maths : {
            dragCalc() : void
        }
    }
}

