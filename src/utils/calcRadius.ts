type CalcRadius = (startX: number, endX: number, startY: number, endY: number,) => number

export const calcRadius: CalcRadius = (startX, endX, startY, endY) => {
    const side1 = Math.pow(endX - startX, 2)
    const side2 = Math.pow(endY - startY, 2)
    return Math.sqrt(side1 + side2)
}
