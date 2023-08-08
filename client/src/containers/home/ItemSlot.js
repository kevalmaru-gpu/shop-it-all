import React from 'react'
import Ratings from '../../components/item/Ratings'

function ItemSlot() {
  return (
    <div className='mr-10 w-[60%]'>
            <img className='rounded-lg ' src='products/1/1.jpg'/>
            <div className='w-full flex flex-row items-center justify-between'>
                <h1 className='text-lg font-bold'>Sneakers you like</h1>
                <h1 className='text-sm font-bold'>$1000</h1>
            </div>
            <Ratings rating={3.4} totalUsers={500} />
            <div className='flex flex-wrap justify-start items-center'>
                <button className='mr-3 text-vsm md:text-md bg-gray-600  hover:bg-gray-200 hover:text-black text-white p-2 rounded-md'>Add to Cart</button>
                <button className='mt-2 lg:mt-0 mr-3 text-vsm md:text-md bg-gray-600  hover:bg-gray-200 hover:text-black text-white p-2 rounded-md'>Buy now</button>
            </div>
        </div>
  )
}

export default ItemSlot