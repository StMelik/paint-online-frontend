import { IMessage, MessageType } from "../types/message";
import { ToolType } from "../types/tool";
import Tool from "./Tool";

export default class Rect extends Tool {
    mouseDown = false
    startX = 0
    startY = 0
    saved = ''
    width = 0
    height = 0

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id, ToolType.Rect)
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
                type: ToolType.Rect,
                x: this.startX,
                y: this.startY,
                height: this.height,
                width: this.width,
                color: this.ctx.fillStyle
            }
        } as IMessage))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.width = e.offsetX - this.startX;
            this.height = e.offsetY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height
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

    static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}
