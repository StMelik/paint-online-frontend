import Api from "./Api"

type drawImageServer = (canvas: HTMLCanvasElement, sessionId: string) => void

export const drawImageServer: drawImageServer = (canvas, sessionId) => {
    const ctx = canvas.getContext('2d')!

    Api.getImage(sessionId)
        .then(data => {
            const img = new Image()
            img.src = data
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                ctx.stroke()
            }
        })
}
