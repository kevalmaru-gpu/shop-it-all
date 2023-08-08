function Button(props) {
    const { text, method, className } = props

    return (
        <div className={className}>
            <button onClick={method} className={" w-fit p-2 rounded-md bg-gray-300 hover:bg-gray-200 cursor-pointer"}>{text}</button>
        </div>
    )
}

export default Button