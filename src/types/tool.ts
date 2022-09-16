export enum ToolType {
    Brush = 'brush',
    Rect = 'rect',
    Circle = 'circle',
    Eraser = 'eraser',
    Line = 'line',
    Finish = 'finish',
}

export type CanvasColor = string | CanvasGradient | CanvasPattern

interface IToolBase {
    type: ToolType;
    color: CanvasColor;
    lineWidth: number;
    x: number;
    y: number;
}

interface IBrush extends IToolBase {
    type: ToolType.Brush;
}

interface IRect extends IToolBase {
    type: ToolType.Rect;
    width: number;
    height: number;
}

interface ICircle extends IToolBase {
    type: ToolType.Circle;
    radius: number;
}

interface IEraser extends IToolBase {
    type: ToolType.Eraser;
}

interface ILine extends IToolBase {
    type: ToolType.Line;
    endX: number;
    endY: number;
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
