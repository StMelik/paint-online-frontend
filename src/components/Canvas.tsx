import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import '../styles/canvas.scss'
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Popup from './Popup';
import { SERVER_URL, WS_SERVER } from '../utils/constants';
import { FiguresType, IMessage, IMessageDraw, Methods } from './types/canvas';
import Rect from '../tools/Rect';

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current!)
        const ctx = canvasRef.current?.getContext('2d')!
        axios.get('/image', {
            baseURL: SERVER_URL,
            params: {
                id: params.id
            }
        })
            .then(responce => {
                const img = new Image()
                img.src = responce.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
                    ctx.stroke()

                }
            })
    }, [])

    useEffect(() => {
        if (!canvasState.username) return

        const socket = new WebSocket(WS_SERVER)

        canvasState.setSocket(socket)
        canvasState.setSessionId(params.id!)
        toolState.setTool(new Brush(canvasRef.current!, socket, params.id!))

        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: params.id!,
                username: canvasState.username,
                method: Methods.Connection,
            } as IMessage))
        }

        socket.onmessage = (e: MessageEvent) => {
            const msg: IMessage = JSON.parse(e.data)

            switch (msg.method) {
                case Methods.Connection:
                    console.log(`Пользователь ${msg.username} подключился`);
                    break
                case Methods.Draw:
                    drawHandler(msg)
                    break
            }
        }
    }, [canvasState.username])

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasRef.current!.toDataURL())
        axios.post('/image',
            {
                img: canvasRef.current?.toDataURL(),
                name: `${params.id}.jpg`
            },
            {
                baseURL: SERVER_URL
            })
            .then(responce => console.log(responce.data))
    }

    function connectHandler(username: string) {
        canvasState.setUsername(username)
    }

    function drawHandler(msg: IMessageDraw) {
        const figure = msg.figure
        const ctx = canvasRef.current!.getContext('2d')!
        switch (figure?.type) {
            case FiguresType.Brush:
                Brush.draw(ctx, figure.x, figure.y)
                break
            case FiguresType.Rect:
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case FiguresType.Finish:
                ctx.beginPath()
                break
        }
    }

    return (
        <div className="canvas">
            <Popup
                connectHandler={connectHandler}
            />
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onMouseDown={mouseDownHandler}
            />
        </div>
    );
})

export default Canvas;
