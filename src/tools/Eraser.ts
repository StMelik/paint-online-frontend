import { ToolType } from '../types/tool';
import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id)
        this.ctx.strokeStyle = "#ffffff"
        this.name = ToolType.Eraser
    }
}
