import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import '../styles/canvas.scss'
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Popup from './Popup';
import { WS_SERVER } from '../utils/constants';

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current!)
        toolState.setTool(new Brush(canvasRef.current!))
    }, [])

    useEffect(() => {
        if (!canvasState.username) return

        const socket = new WebSocket(WS_SERVER)

        socket.onopen = () => {
            socket.send(JSON.stringify({
                id: params.id,
                username: canvasState.username,
                method: 'connection'
            }))
        }

        socket.onmessage = (e: MessageEvent) => {
            console.log(e.data);
        }
    }, [canvasState.username])

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasRef.current!.toDataURL())
    }

    function connectHandler(username: string) {
        canvasState.setUsername(username)
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
