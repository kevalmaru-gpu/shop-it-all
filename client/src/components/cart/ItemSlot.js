import React, { useContext, useEffect, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import Button from '../../ui/Button'
import { ProductContext } from '../../store/product-context'

function ItemSlot(props) {
    const [totalItems, setTotalItems] = useState()
    const {name, price, image} = props.data

    const productContext = useContext(ProductContext)

    useEffect(() => {
        setTotalItems(props.data.count)
    }, [])

    const removeFromCartHandler = () => {
        productContext.remove_from_cart(props.data._id)
        productContext.removeFromCartItems(props.data._id)
    }

    const countHandler = async (ACTION) => {
        switch(ACTION){
            case 'ADD':
                const response = await props.productContext.updateCartCount(props.data._id,totalItems+1)
                if (response.status === 'success') setTotalItems(totalItems+1)
                break
            case 'REMOVE':
                console.log(totalItems)
                if (totalItems > 1){    
                    const response = await props.productContext.updateCartCount(props.data._id,totalItems-1)
                    if (response.status === 'success') setTotalItems(totalItems-1)
                }
                break
        }
    }

    return (
        <div className='my-[1rem] w-full h-fit flex flex-row justify-between items-center'>
            <div className='flex flex-row w-[30%] h-full justify-start items-center'>
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
            <button onClick={removeFromCartHandler} className="w-[10%] text-vsm"><GrClose/></button>
        </div>
    )
}

export default ItemSlot