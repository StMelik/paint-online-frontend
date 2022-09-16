import { CanvasColor, ToolType } from "../types/tool";
import { calcRadius } from '../utils/calcRadius';
import Tool from "./Tool";

export default class Circle extends Tool {
    saved = ''
    startX = 0
    startY = 0

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.listen()
        this.name = ToolType.Circle
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false

        this.socketSend({
            type: ToolType.Circle,
            color: this.ctx.strokeStyle,
            x: this.startX,
            y: this.startY,
            radius: calcRadius(this.startX, e.offsetX, this.startY, e.offsetY)
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
            let radius = calcRadius(this.startX, e.offsetX, this.startY, e.offsetY)
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x: number, y: number, radius: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, radius, 0, Math.PI * 2)
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: CanvasColor) {
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.closePath()
        ctx.strokeStyle = color
        ctx.stroke()
    }
}
