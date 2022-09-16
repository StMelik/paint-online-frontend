export default class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    socket: WebSocket;
    id: string
    name: string

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string, name: string) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.ctx = canvas.getContext('2d')!
        this.destroyEvents()
        this.name = name
    }

    set fillColor(color: string) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
    }
}
