import Brush from "./Brush";

export default class Eraser extends Brush {
    mouseDown = false;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.ctx.strokeStyle = "#ffffff"
    }
}
