import React, { useContext } from 'react'
import Ratings from '../item/Ratings'
import { ProductContext } from '../../store/product-context'
import {AiOutlineCheck} from 'react-icons/ai'
function ItemSlot(props) {
    const {name, image, price, rating} = props.data
    const productContext = useContext(ProductContext)

    return (
    <div className='my-[1rem] w-full h-fit flex flex-row justify-between items-center'>
            <div className='flex flex-row w-[50%] h-full justify-start items-center'>
                <div className='w-[10%]]'>
                    <img src={image} alt='Image not available' className='w-full rounded-md'></img>
                </div>
                <div className='w-[90%] mx-5 font-bold flex flex-col justify-start'>
                    <h1 className='text-[.7rem] md:text-sm'>{name.substring(0, 20)}</h1>
                    <Ratings rating={rating} totalUsers={500}/>
                </div>
                <h1 className='text-[1rem] font-bold'>{price}</h1>
            </div>
            <div className='flex flex-row'>
                <button onClick={() => productContext.addProductToCart(props.data._id)} className='mx-2 flex justify-center items-center h-[2rem] w-[7rem] text-vsm md:text-sm p-1 md:p-2 rounded-full border-[1px] border-black hover:bg-gray-500 hover:text-white hover:border-white transition-all duration-500 '>{
                productContext.cartItems.includes(props.data._id) ? <AiOutlineCheck/> : <>Cart</>
                }</button>
                <button onClick={() => productContext.buy_products([props.data._id])} className='flex justify-center items-center h-[2rem] w-[7rem] text-vsm md:text-sm p-1 md:p-2 rounded-full border-[1px] border-black hover:bg-gray-500 hover:text-white hover:border-white transition-all duration-500 '>Buy</button>
            </div>
        </div>
  )
}

export default ItemSlot