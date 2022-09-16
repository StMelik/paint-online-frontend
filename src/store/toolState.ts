import { makeAutoObservable } from 'mobx'
import Tool from '../tools/Tool'
import { CanvasColor } from '../types/tool'

class ToolState {
    tool: Tool | null = null
    color: CanvasColor = '#000000'
    lineWidth = 1

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
        this.color = color
    }

    setLineWidth(lineWidth: number) {
        if (!this.tool) return
        this.tool.lineWidth = lineWidth
        this.lineWidth = lineWidth
    }
}

export default new ToolState()
