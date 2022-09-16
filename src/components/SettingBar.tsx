import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import toolState from '../store/toolState';
import '../styles/toolbar.scss'
import { ToolType } from '../types/tool';

const SettingBar = observer(() => {
    const [color, setColor] = useState('#000000')

    useEffect(() => {
        if (toolState.tool?.name === ToolType.Eraser) return
        toolState.setColor(color)
    }, [toolState.tool, color])

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
                onChange={(e) => setColor(e.target.value)}
                value={color}
            />
        </div>
    );
})

export default SettingBar;
