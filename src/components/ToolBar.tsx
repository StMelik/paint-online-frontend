import React from 'react';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';
import Rect from '../tools/Rect';

const ToolBar = () => {
    function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        toolState.setStrokeColor(value)
        toolState.setFillColor(value)
    }

    return (
        <div className="toolbar">

            <button
                className='toolbar__button toolbar__button_brush'
                onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
            />
            <button
                className='toolbar__button toolbar__button_rect'
                onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
            />
            <button
                className='toolbar__button toolbar__button_circle'
                onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
            />
            <button
                className='toolbar__button toolbar__button_eraser'
                onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
            />
            <button
                className='toolbar__button toolbar__button_line'
                onClick={() => toolState.setTool(new Line(canvasState.canvas))}
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
            />
        </div>
    );
}

export default ToolBar;
