import React from 'react'

function Dropdown(props) {
    const { label , hasError, updateValue, updateFocus, items } = props

    const errorStyle = hasError ? "border-[.02rem] border-red border-opacity-50" : " "

    return (
        <div className={"relative w-[70%] h-fit mx-1 my-3" }>
            <select onFocus={() => updateFocus(true)} onBlur={() => updateFocus(false)} onChange={(e) => updateValue(e.target.value)} className={errorStyle +" px-2.5 py-3.5 w-full text-sm text-black bg-slate-300 rounded-lg border-1 border-gray-300 outline-none"}>
                <option name='' value=''>{label}</option>
                {
                    Array.isArray(items)
                    &&
                    items.map((item,index) => {
                        return <option key={index} name={item.name} value={item.value}>{item.value}</option>
                    })
                }
            </select>
        </div>
    )
}

export default Dropdown