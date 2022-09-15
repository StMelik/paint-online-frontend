export enum ToolType {
    Brush = 'brush',
    Rect = 'rect',
    Circle = 'circle',
    Eraser = 'eraser',
    Line = 'line',
    Finish = 'finish',
}

interface IBrush {
    type: ToolType.Brush,
    x: number,
    y: number,
    color: string,
}

interface IRect {
    type: ToolType.Rect,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
}

interface ICircle {
    type: ToolType.Circle,
    x: number,
    y: number,
    radius: number,
}

interface IEraser {
    type: ToolType.Eraser,
    x: number,
    y: number,
    color: string,
}

interface ILine {
    type: ToolType.Line,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
}

interface IFinish {
    type: ToolType.Finish,
}

export type ITool =
    IBrush |
    IRect |
    ICircle |
    IEraser |
    ILine |
    IFinish
