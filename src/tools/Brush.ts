import { CanvasColor, ToolType } from "../types/tool";
import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
        this.name = ToolType.Brush
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler() {
        this.mouseDown = false
        this.socketSend({ type: ToolType.Finish })
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.socketSend({
                type: ToolType.Brush,
                color: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth,
                x: e.offsetX,
                y: e.offsetY,
            })
        }
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number, color: CanvasColor, lineWidth: number) {
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
