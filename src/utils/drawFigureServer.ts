import Brush from "../tools/Brush"
import Circle from "../tools/Circle"
import Eraser from "../tools/Eraser"
import Line from "../tools/Line"
import Rect from "../tools/Rect"
import { ITool, ToolType } from "../types/tool"

type drawFigureServer = (tool: ITool, canvas: HTMLCanvasElement) => void

export const drawFigureServer: drawFigureServer = (tool, canvas) => {
    const ctx = canvas.getContext('2d')!

    switch (tool.type) {
        case ToolType.Brush:
            Brush.draw(ctx, tool.x, tool.y, tool.color)
            break
        case ToolType.Rect:
            Rect.staticDraw(ctx, tool.x, tool.y, tool.width, tool.height, tool.color)
            break
        case ToolType.Circle:
            Circle.staticDraw(ctx, tool.x, tool.y, tool.radius, tool.color)
            break
        case ToolType.Eraser:
            Eraser.draw(ctx, tool.x, tool.y, "#ffffff")
            break
        case ToolType.Line:
            Line.staticDraw(ctx, tool.x, tool.y, tool.endX, tool.endY, tool.color)
            break
        case ToolType.Finish:
            ctx.beginPath()
            break
    }
}
