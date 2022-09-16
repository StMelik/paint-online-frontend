import { observer } from 'mobx-react-lite';
import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Rect from '../tools/Rect';
import { ToolType } from '../types/tool';
import { downloadFile } from '../utils/downloadFile';

const ToolBar = observer(() => {
    function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        toolState.setStrokeColor(value)
        toolState.setFillColor(value)
    }

    function download() {
        const dataUrl = canvasState.canvas.toDataURL()
        const name = canvasState.sessionId + ".jpg"
        downloadFile(dataUrl, name)
    }

    function getButtonClass(name: ToolType): string {
        const cl = `toolbar__button toolbar__button_${name}`
        return toolState.tool?.name === name ? `${cl} toolbar__button_active` : cl
    }

    function setTool(tool: ToolType): void {
        const {canvas, socket, sessionId} = canvasState

        switch(tool) {
            case ToolType.Brush:
                toolState.setTool(new Brush(canvas, socket, sessionId))
                break
            case ToolType.Rect:
                toolState.setTool(new Rect(canvas, socket, sessionId))
                break
            case ToolType.Circle:
                toolState.setTool(new Circle(canvas, socket, sessionId))
                break
            case ToolType.Eraser:
                toolState.setTool(new Eraser(canvas, socket, sessionId))
                break
            case ToolType.Line:
                toolState.setTool(new Line(canvas, socket, sessionId))
                break
        }
    }

    return (
        <div className="toolbar">
            <button
                className={getButtonClass(ToolType.Brush)}
                onClick={() => setTool(ToolType.Brush)}
            />
            <button
                className={getButtonClass(ToolType.Rect)}
                onClick={() => setTool(ToolType.Rect)}
            />
            <button
                className={getButtonClass(ToolType.Circle)}
                onClick={() => setTool(ToolType.Circle)}
            />
            <button
                className={getButtonClass(ToolType.Eraser)}
                onClick={() => setTool(ToolType.Eraser)}
            />
            <button
                className={getButtonClass(ToolType.Line)}
                onClick={() => setTool(ToolType.Line)}
            />
            <input
                className='toolbar__button toolbar__button_color'
                type="color"
                onChange={changeColor}
            />
            <button
                className='toolbar__button toolbar__button_back'
                onClick={() => canvasState.undo()}
            />
            <button
                className='toolbar__button toolbar__button_next'
                onClick={() => canvasState.redo()}
            />
            <button
                className='toolbar__button toolbar__button_save'
                onClick={download}
            />
        </div>
    );
})

export default ToolBar;
