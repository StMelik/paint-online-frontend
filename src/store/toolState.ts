import { makeAutoObservable } from 'mobx'
import Tool from '../tools/Tool'
import { CanvasColor } from '../types/tool'

class ToolState {
    tool: Tool | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool) {
        this.tool = tool
    }

    setColor(color: CanvasColor) {
        if (!this.tool) return
        this.tool.fillColor = color
        this.tool.strokeColor = color
    }

    setLineWidth(width: number) {
        if (!this.tool) return
        this.tool.lineWidth = width
    }
}

export default new ToolState()
