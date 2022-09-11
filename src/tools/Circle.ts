import Tool from "./Tool";

export default class Circle extends Tool {
    mouseDown: boolean;
    startX: number
    startY: number
    saved: string

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
        this.mouseDown = false
        this.startX = 0
        this.startY = 0
        this.saved = ''
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
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent): void {
        if (this.mouseDown) {
            let currentX = e.offsetX;
            let currentY = e.offsetY;
            let radiusX = Math.abs(currentX - this.startX);
            let radiusY = Math.abs(currentY - this.startY);
            let radius = Math.max(radiusX, radiusY)
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x: number, y: number, radius: number): void {
        const img: HTMLImageElement = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, radius, 0, Math.PI * 2)
            this.ctx.stroke()
        }
    }
}
