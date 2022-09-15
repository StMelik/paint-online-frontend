import { IMessage, MessageType } from "../types/message";
import { ToolType } from "../types/tool";
import Tool from "./Tool";

export default class Brush extends Tool {
    mouseDown = false

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: MessageType.Draw,
            tool: {
                type: ToolType.Finish
            }
        } as IMessage))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.offsetX, e.offsetY)
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                id: this.id,
                method: MessageType.Draw,
                tool: {
                    type: ToolType.Brush,
                    x: e.offsetX,
                    y: e.offsetY,
                    color: this.ctx.strokeStyle
                }
            } as IMessage))
        }
    }

    static draw(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
        ctx.strokeStyle = color
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}
