import { createContext, useState } from "react";

const UiContext = createContext({
    confirmModel: false,
    confirmModelHandler: () => {},
    confirmModelText : null
})

const UiContextProvider = (props) => {
    const [confirmModel, setConfirmModel] = useState(false)
    const [confirmModelText, setConfirmModelText] = useState(null)

    const confirmModelHandler = (text, state) => {
        setConfirmModel(state)
        setConfirmModelText(text)
    }

    return (
        <UiContext.Provider value={{
            confirmModel: confirmModel,
            confirmModelHandler: confirmModelHandler,
            confirmModelText: confirmModelText
        }}>
            {props.children}
        </UiContext.Provider>
    )
}

export { UiContext, UiContextProvider}