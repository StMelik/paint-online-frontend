import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import '../styles/canvas.scss'
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Popup from './Popup';
import { WS_SERVER } from '../utils/constants';
import Api from '../utils/Api';
import { drawImageServer } from '../utils/drawImageServer';
import { connectionWS } from '../utils/connectionWS';

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current!)
        canvasState.setSessionId(params.id!)
    }, [])

    useEffect(() => {
        const username = canvasState.username
        const canvas = canvasState.canvas
        const sessionId = canvasState.sessionId
        const socket = new WebSocket(WS_SERVER)

        if (!username) return

        canvasState.setSocket(socket)
        toolState.setTool(new Brush(canvas, socket, sessionId))

        drawImageServer(canvas, sessionId)
        connectionWS(socket, canvas, { id: sessionId, username })
    }, [canvasState.username])

    function mouseDownHandler() {
        canvasState.pushToUndo(canvasState.canvas.toDataURL())
        canvasState.clearRedo()
    }

    function mouseUpHandler() {
        const img = canvasState.canvas.toDataURL()!
        const name = `${canvasState.sessionId}.jpg`
        Api.postImage(img, name)
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
                width={1000}
                height={600}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
            />
        </div>
    );
})

export default Canvas;
