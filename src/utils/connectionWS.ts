import { IMessage, MessageType } from "../types/message"
import { drawFigureServer } from "./drawFigureServer"

type ConnectionWS = (
    socket: WebSocket,
    canvas: HTMLCanvasElement,
    data: {
        id: string,
        username: string
    },
) => void

export const connectionWS: ConnectionWS = (socket, canvas, { id, username }) => {
    socket.onopen = () => {
        socket.send(JSON.stringify({
            id,
            username,
            method: MessageType.Connection,
        } as IMessage))
    }

    socket.onmessage = (e: MessageEvent) => {
        const message: IMessage = JSON.parse(e.data)

        switch (message.method) {
            case MessageType.Connection:
                console.log(`Пользователь - ${message.username} подключился.`);
                break
            case MessageType.Draw:
                drawFigureServer(message.tool, canvas)
                break
        }
    }
}
