import Ratings from '../../components/item/Ratings'
import { useContext, useEffect, useState } from 'react'

import { ProductContext } from '../../store/product-context'
import { useParams } from 'react-router-dom'

import { BiCheck } from 'react-icons/bi'

function Product(props) {
    const [totalItems, setTotalItems] = useState(1)
    const [productData, setProductData] = useState(null)

    const productContext = useContext(ProductContext)
    const {id} = useParams()

    useEffect(() => {
        const getProductData = async () => {
            const response = await productContext.getProductById(id)
            if (response.status === 'success') setProductData(response.message)
            console.log(response)
        }
        getProductData()
    }, [])

    return (
        <div className='px-[2%] lg:px-[8%] font-work_sans w-full h-[88%] flex flex-col lg:flex-row items-center justify-center'>
            <div className='w-[70%] lg:w-1/2 h-[80%] flex flex-col'>
                <div className='w-[95%] lg:w-[80%] h-[80%] bg-gray-200 relative flex items-center justify-center rounded-sm'>
                    <img src={productData && productData.image} className='absolute h-[50%] lg:h-[70%] mix-blend-multiply' ></img>
                </div>
                
            </div>
            <div className='w-[70%] lg:w-1/2 h-[80%] flex flex-col items-start justify-start mt-[4rem] lg:mt-[0rem]'>
                <h1 className='text-xl lg:text-3xl font-bold'>{productData && productData.name}</h1>
                <h1 className='text-vsm lg:text-sm my-2'>{productData && productData.sub_category}</h1>

                <Ratings rating={productData && productData.rating} totalUsers={500}/>

                <h1 className='text-xl lg:text-3xl py-4'>{productData && productData.price}</h1>

                <div className='m-3 w-full flex flex-row items-center'>
                    <button 
                    onClick={() => { totalItems > 0 ? setTotalItems(totalItems-1) : setTotalItems(totalItems) }}
                    className='w-[1rem] lg:w-[2rem] h-[2rem] lg:h-[3rem]  text-2xl bg-gray-200 rounded-full'>-</button>
                    <input type='number' value={totalItems.toString()} className='z-[-1] w-[10rem] lg:w-[12rem] h-[3rem] translate-x-[-3rem] outline-none text-center text-xl bg-gray-200 rounded-full'></input>
                    <button 
                    onClick={() => { setTotalItems(totalItems+1) }}
                    className='w-[1rem] lg:w-[2rem] h-[2rem] lg:h-[3rem] translate-x-[-6rem] bg-gray-200 rounded-full text-2xl'>+</button>

                    <h1 className='mx-2 translate-x-[-4rem]'>Only <span className=' text-orange-400'>12 Items</span> Left</h1>
                </div>

                <div className='mt-[3rem] w-full h-fit flex flex-row'>
                    <button onClick={() => productContext.buy_products([productData._id])} className='w-[7rem] mr-5 border-[1px] border-black  rounded-full p-2 hover:bg-slate-200 hover:opacity-70'>Buy Now</button>
                    <button disabled={productData && productData.inCart} onClick={() => productContext.addProductToCart(productData._id)} className='w-[7rem] mr-5 border-[1px] border-black rounded-full p-2 hover:bg-slate-200 hover:opacity-70 flex justify-center items-center'>{productData && productData.inCart ? <BiCheck/> : "Add to Cart"}</button>
                </div>
            </div>
        </div> 
    )
}

export default Product