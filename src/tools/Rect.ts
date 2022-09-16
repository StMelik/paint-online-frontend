import { CanvasColor, ToolType } from "../types/tool";
import Tool from "./Tool";

export default class Rect extends Tool {
    saved = ''
    startX = 0
    startY = 0

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
        this.name = ToolType.Rect
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        this.socketSend({
            type: ToolType.Rect,
            color: this.ctx.fillStyle,
            x: this.startX,
            y: this.startY,
            height: e.offsetY - this.startY,
            width: e.offsetX - this.startX,
        })
        this.socketSend({ type: ToolType.Finish })
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
            let height = e.offsetY - this.startY;
            this.draw(this.startX, this.startY, width, height
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

    static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: CanvasColor) {
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.fill()
        ctx.stroke()
    }
}
