import { CanvasColor, ToolType } from "../types/tool";
import Tool from "./Tool";

export default class Line extends Tool {
    saved = '';
    startX = 0;
    startY = 0;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
        this.name = ToolType.Line
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        this.socketSend({
            type: ToolType.Line,
            color: this.ctx.strokeStyle,
            lineWidth: this.ctx.lineWidth,
            x: this.startX,
            y: this.startY,
            endX: e.offsetX,
            endY: e.offsetY
        })
        this.socketSend({ type: ToolType.Finish })
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

    static staticDraw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: CanvasColor, lineWidth: number) {
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.stroke()
        ctx.closePath()
    }
}
