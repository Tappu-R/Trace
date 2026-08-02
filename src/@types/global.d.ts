declare global {
    interface Point {
        x: number
        y: number
    }

    interface Window {
        API: {
            openOverlay(): void
            drag(mousePosition: Point): void
        }
    }
}

export {}
