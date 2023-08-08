import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import { UiContext } from '../../store/ui-context'

function ConfirmModel() {
    const uiContext = useContext(UiContext)
    const root = document.getElementById('root')

    return uiContext.confirmModel && createPortal(<div className='absolute inset-0 w-full h-full flex justify-center items-center z-40 text-3xl bg-black bg-opacity-25 font-work_sans'>
        <div className='animate__bounceIn animate__animated w-[50%] lg:w-[30%] h-fit py-[3rem] bg-white rounded-md flex justify-center items-center flex-col'>
            <h1 className='text-sm lg:text-2xl text-center font-bold'>{uiContext.confirmModelText}</h1>
            <button onClick={() => uiContext.confirmModelHandler('', false)}  className={"disabled:bg-gray-300 w-fit mx-1 mt-14 p-2 px-10 text-sm lg:text-xl rounded-md bg-blue-300 hover:bg-blue-200 cursor-pointer"}>Ok</button>
        </div>
    </div>, root) 
}

export default ConfirmModel