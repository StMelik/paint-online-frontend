import { ITool } from "./tool";

export enum MessageType {
    Connection = 'connection',
    Draw = 'draw',
}

interface IMessageBase {
    method: MessageType,
    id: string
}

interface IMessageConnection extends IMessageBase {
    method: MessageType.Connection;
    username: string;
}

export interface IMessageDraw extends IMessageBase {
    method: MessageType.Draw;
    tool: ITool;
}

export type IMessage = IMessageConnection | IMessageDraw
