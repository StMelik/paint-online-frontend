import toolState from '../store/toolState';
import '../styles/toolbar.scss'

const SettingBar = () => {
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
                htmlFor="stroke-color"
                className='toolbar__label'
            >
                Цвет обводки:
            </label>
            <input
                id='stroke-color'
                className='toolbar__input toolbar__input_stroke-color'
                type="color"
                onChange={e => toolState.setStrokeColor(e.target.value)}
            />
        </div>
    );
}

export default SettingBar;
