import React, { useContext, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import Ratings from '../item/Ratings'
import { ProductContext } from '../../store/product-context'
import { useNavigate } from 'react-router-dom'

function ItemSlot(props) {
    const {name, rating, price, image} = props.data 
    
    const [heartIcon,heartIconHandler] = useState(<AiOutlineHeart/>)

    const productContext = useContext(ProductContext)
    const navigator = useNavigate()

    const heartHoverHandler = (hoverState) => {
        return hoverState === false ? <AiOutlineHeart /> : <AiFillHeart/>
    }

    const viewProductHandler = () => {
        navigator(`/product/${props.data._id}`)
    }


    return (
        <div className='mr-[4rem] my-[1.5rem] w-[12rem] relative'>
            <div onClick={viewProductHandler} className='cursor-pointer w-full h-[12rem] md:w-[15rem] md:h-[15rem] bg-slate-300 bg-opacity-60 relative flex justify-center items-center'>
                <img src={image} alt='Image not available' className='absolute inset-0 h-full mix-blend-multiply'></img>
            </div>
            <div className='absolute w-fit h-fit inset-0 top-[.5rem] left-[85%] md:left-[110%] text-sm lg:text-lg hover:' 
            onMouseEnter={() => {
                heartIconHandler(heartHoverHandler(true))
            }}
            onMouseLeave={() => {
                heartIconHandler(heartHoverHandler(false))
            }}
            >
                { heartIcon }
            </div>
            <div className='w-[12rem    ] md:w-[14.6rem] font-bold flex items-center justify-between'>
                <h1  className='text-vsm md:text-sm'>{name.substring(0,30)}</h1>
                <h1 className='text-sm '>{price}</h1>
            </div>
            <div className='flex flex-row text-sm md:text-lg my-2 items-center'>
            {
                <Ratings rating={parseFloat(rating)} totalUsers={500}/>
            }
            </div>
            <button onClick={() => productContext.addProductToCart(props.data._id)} className='text-vsm md:text-sm p-1 md:p-2 rounded-full border-[1px] border-black hover:bg-gray-500 hover:text-white hover:border-white transition-all duration-500 '>Add to Cart</button>
        </div>
    )
}

export default ItemSlot