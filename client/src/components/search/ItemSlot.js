import React from 'react'

function ItemSlot() {
  return (
    <div className='my-[1rem] w-full h-fit flex flex-row justify-between items-center'>
            {/* <div className='flex flex-row w-[30%] h-full justify-start items-center'>
                <div className='w-[80%]'>
                    <img src={image} alt='Image not available' className='w-full rounded-md'></img>
                </div>
                <div className='w-fit mx-5 font-bold flex flex-col'>
                    <h1 className='text-vsm md:text-sm'>{name.substring(0, 20)}</h1>
                    <h1 className='text-sm '>{price}</h1>
                </div>
            </div>
            <div className='mx-2  flex flex-row bg-zinc-200 lg:w-[15%] w-[20%] justify-between p-2 rounded-full'>
                <button onClick={() => countHandler('ADD')} className='mx-3'>+</button>
                <h1>{totalItems}</h1>
                <button onClick={() => countHandler('REMOVE')} className='mx-3'>-</button>
            </div>
            <button onClick={removeFromCartHandler} className="w-[10%] text-vsm"><GrClose/></button> */}
        </div>
  )
}

export default ItemSlot