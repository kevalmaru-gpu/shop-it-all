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
        console.log(productsData)
    }, [productContext.searchString])


    return (
        <div className='h-body'>
        {
            productsData == null ? 
            <h1>DATA NOT FOUND</h1> :

            productsData.map((ele, index) => {
                
            })
        }
        </div>
    )
}

export default Search