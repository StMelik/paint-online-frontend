import toolState from '../store/toolState';
import '../styles/toolbar.scss'

const SettingBar = () => {
    function changeColor(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        toolState.setStrokeColor(value)
        toolState.setFillColor(value)
    }

    return (
        <div className="toolbar toolbar_settings">
            <label
                htmlFor="line-width"
                className='toolbar__label'
            >
                Толщина линии:
            </label>
            <input
                id='line-width'
                className='toolbar__input toolbar__input_line-width'
                type="number"
                onChange={e => toolState.setLineWidth(+e.target.value)}
                defaultValue={1}
                min={1}
            />
            <label
                htmlFor="line-color"
                className='toolbar__label'
            >
                Цвет:
            </label>
            <input
                id='line-color'
                className='toolbar__input toolbar__input_line-color'
                type="color"
                onChange={changeColor}
            />
        </div>
    );
}

export default SettingBar;
