import React, { useContext, useEffect, useState } from 'react'
import ItemSlot from '../../components/search/ItemSlot'
import { ProductContext } from '../../store/product-context'

function Search() {
    const productContext = useContext(ProductContext)
    const [productsData, setProductsData] = useState(null)

    useEffect(() => {
        async function getData(){
            const data = await productContext.getProductsByName()
            if (data.length <= 0) setProductsData(null)
            else setProductsData(data)
        }
        
        getData()
    }, [productContext.searchString])


    return (
        <div className='h-body w-full lg:w-[70%]'>
        {
            productsData == null ? 
            <div className='w-full h-full flex justify-center items-center'><h1>DATA NOT FOUND</h1> </div>:

            productsData.map((ele, index) => {
                return <ItemSlot data={ele} key={index}/>
            })
        }
        </div>
    )
}

export default Search