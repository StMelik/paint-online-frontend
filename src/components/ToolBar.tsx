import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import Brush from '../tools/Brush';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Rect from '../tools/Rect';

const ToolBar = () => {
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
            />
            <input
                className='toolbar__button toolbar__button_color'
                type="color"
            />
            <button
                className='toolbar__button toolbar__button_back'
            />
            <button
                className='toolbar__button toolbar__button_next'
            />
            <button
                className='toolbar__button toolbar__button_save'
            />
        </div>
    );
}

export default ToolBar;
