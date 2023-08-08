import { useState } from 'react'

function useInput(validationMethod, api_call = () => true){
    const [value, updateValue] = useState("")
    const [isFocus, updateFocus] = useState(true)
    const [otherError, setOtherError] = useState(false)

    const focusHandler = (state) => {
        if (state) setOtherError(false)
        updateFocus(state)
    }
    
    const hasError = (!validationMethod(value) && !isFocus) || otherError

    return {
        value, updateValue, isFocus, focusHandler, hasError, setOtherError
    }   
}

export default useInput