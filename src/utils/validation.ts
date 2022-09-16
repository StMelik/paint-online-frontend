type Validation = (input: HTMLInputElement, setMessage: React.Dispatch<string>) => boolean

export const validation: Validation = (input, setMessage) => {
    const isValidValue = input.validity.valid
    setMessage(isValidValue ? '' : input.validationMessage)
    return isValidValue
}
