import '../styles/toolbar.scss'

const ToolBar = () => {
    return (
        <div className="toolbar">

            <button
                className='toolbar__button toolbar__button_brush'
            />
            <button
                className='toolbar__button toolbar__button_rect'
            />
            <button
                className='toolbar__button toolbar__button_circle'
            />
            <button
                className='toolbar__button toolbar__button_eraser'
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
