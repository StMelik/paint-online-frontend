export enum ToolType {
    Brush = 'brush',
    Rect = 'rect',
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

interface IFinish {
    type: ToolType.Finish,
}

export type ITool =
    IBrush |
    IRect |
    IFinish
