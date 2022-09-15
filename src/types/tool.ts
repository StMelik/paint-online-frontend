export enum ToolType {
    Brush = 'brush',
    Rect = 'rect',
    Circle = 'circle',
    Eraser = 'eraser',
    Line = 'line',
    Finish = 'finish',
}

interface IToolBase {
    type: ToolType,
    x: number,
    y: number,
}

interface IBrush extends IToolBase {
    type: ToolType.Brush,
    color: string,
}

interface IRect extends IToolBase {
    type: ToolType.Rect,
    width: number,
    height: number,
    color: string,
}

interface ICircle extends IToolBase {
    type: ToolType.Circle,
    radius: number,
}

interface IEraser extends IToolBase {
    type: ToolType.Eraser,
    color: string,
}

interface ILine extends IToolBase {
    type: ToolType.Line,
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
