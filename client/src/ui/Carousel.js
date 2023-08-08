import React, {  useEffect } from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'
import { useState } from 'react'

function Carousel({ children: posters }) {
    const SLIDE_DELAY = 3000

    const [currentSlide, updateSlide] = useState(0)

    const next = () => updateSlide(currentSlide === posters.length - 1 ? 0 : currentSlide+1)
    const prev = () => updateSlide(currentSlide === 0 ? posters.length - 1 : currentSlide-1)

    const timeOut = async () => {
        await setTimeout(next, SLIDE_DELAY)
    }

    useEffect(() => {
        timeOut()
    }, [currentSlide]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='w-full overflow-hidden relative h-auto'>
            <div className='flex transition-transform ease-in-out duration-500' style={{transform: `translateX(-${currentSlide * 100}%)`}}>{posters}</div>
            <div className='absolute inset-0 top-[50%] h-[10%] flex items-center justify-between p-4 '>
                <button onClick={prev} className='rounded-full bg-slate-200 bg-opacity-70 p-4 hover:bg-opacity-50'><MdArrowBackIosNew/></button>
                <button onClick={next} className='rounded-full bg-slate-200 bg-opacity-70 p-4 hover:bg-opacity-50' ><MdArrowForwardIos/></button>
            </div>
        </div>
    )
}

export default Carousel