export const getSessionId = (): string => {
    return `fc${(+new Date()).toString(16)}`
}
