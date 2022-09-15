import Tool from "./Tool";

export default class Line extends Tool {
    mouseDown = false;
    saved = '';
    startX = 0;
    startY = 0;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.startX = e.offsetX
        this.startY = e.offsetY
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(e.offsetX, e.offsetY)
        }
    }

    draw(x: number, y: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }
    }
}
