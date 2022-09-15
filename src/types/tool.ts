export enum ToolType {
    Brush = 'brush',
    Rect = 'rect',
    Circle = 'circle',
    Finish = 'finish',
}

interface IBrush {
    type: ToolType.Brush,
    x: number,
    y: number,
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

interface IFinish {
    type: ToolType.Finish,
}

export type ITool =
    IBrush |
    IRect |
    ICircle |
    IFinish
