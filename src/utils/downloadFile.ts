type downloadFile = (url: string, name: string) => void

export const downloadFile: downloadFile = (url, name) => {
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
