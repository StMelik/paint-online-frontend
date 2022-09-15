import { ITool } from "./tool";

export enum MessageType {
    Connection = 'connection',
    Draw = 'draw',
}

interface IMessageConnection {
    method: MessageType.Connection;
    id: string;
    username: string;
}

export interface IMessageDraw {
    method: MessageType.Draw;
    id: string;
    tool: ITool;
}

export type IMessage = IMessageConnection | IMessageDraw
