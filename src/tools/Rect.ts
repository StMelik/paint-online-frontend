import Tool from "./Tool";

export default class Rect extends Tool {
    mouseDown = false
    startX = 0
    startY = 0
    saved = ''

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
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            let width = e.offsetX - this.startX;
            let heigth = e.offsetY - this.startY;
            this.draw(this.startX, this.startY, width, heigth
            )
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}
