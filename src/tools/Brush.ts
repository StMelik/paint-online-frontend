import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
        this.mouseDown = false
    }

    listen(): void {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent): void {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent): void {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseMoveHandler(e: MouseEvent): void {
        if (this.mouseDown) {
            this.draw(e.offsetX, e.offsetY)
        }
    }

    draw(x: number, y: number): void {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
