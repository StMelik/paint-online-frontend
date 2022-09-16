import { IMessage, MessageType } from '../types/message';
import { CanvasColor, ITool } from '../types/tool';

export default class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    socket: WebSocket;
    id: string
    mouseDown = false
    name = ''

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')!
        this.destroyEvents()
    }

    set fillColor(color: CanvasColor) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: CanvasColor) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    private destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
    }

    protected socketSend(tool: ITool) {
        this.socket.send(JSON.stringify({
            id: this.id,
            method: MessageType.Draw,
            tool
        } as IMessage))
    }
}
