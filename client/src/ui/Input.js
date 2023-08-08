import React, { useRef } from 'react'

function Input(props) {
    const { id, label, updateValue, updateFocus, type, hasError, warning, defaultValue } = props

    const errorStyle = hasError ? "border-[.02rem] border-red border-opacity-50" : " "

    return (
        <div className={" relative w-[70%] h-fit mx-1 my-3 flex flex-col" }>
            <input id={id} defaultValue={defaultValue && defaultValue}  type={type} onFocus={() => updateFocus(true)} onBlur={() => updateFocus(false)} onChange={e => updateValue(e.target.value)}  className={errorStyle + " px-2.5 pb-2.5 pt-4 w-full text-sm text-black bg-slate-300 rounded-lg outline-none dark:focus:border-blue-500  focus:ring-0 focus:border-blue-600 peer"} placeholder=" " />
            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300  z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-[70%] peer-placeholder-shown:top- peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-7 left-0">{label}</label>
            
            { hasError && <label className='text-vsm lg:text-sm text-red'>{warning}</label>}
        </div>
    )
}

export default Input