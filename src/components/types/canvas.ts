// Message

export enum Methods {
    Connection = 'connection',
    Draw = 'draw',
}

interface IMessageConnection {
    id: string;
    username: string;
    method: Methods.Connection;
}

export interface IMessageDraw {
    id: string;
    method: Methods.Draw;
    figure: IFigure;
}

export type IMessage = IMessageConnection | IMessageDraw

// Figure

export enum FiguresType {
    Brush = 'brush',
    Rect = 'rect',
    Finish = 'finish',
}

interface IBrush {
    type: FiguresType.Brush,
    x: number,
    y: number,
}

interface IRect {
    type: FiguresType.Rect,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
}

interface IFinish {
    type: FiguresType.Finish,
}

export type IFigure =
    IBrush |
    IRect |
    IFinish