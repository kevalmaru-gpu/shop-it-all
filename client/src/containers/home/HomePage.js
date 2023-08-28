import './HomePage.css'
import React, { useState, useEffect, useContext } from 'react'
import Carousel from '../../ui/Carousel';

import { storage } from '../../config/firebase_config';
import { listAll, ref } from 'firebase/storage';
import { getFileURL } from '../../firebase/firebase';
import Loading from '../../ui/Loading';
import Product from '../product/Product';
import Categories from '../../components/home/Categories';
import { ProductContext } from '../../store/product-context';
import secureLocalStorage from 'react-secure-storage';


const ItemRow = React.lazy(() => import('./ItemRow'));


function HomePage() {
  const posters = ['posters/sale1.png', 'posters/sale2.png']
  const [main_categories, setMainCategories] = useState([])
  const displayCategories = ["furniture", "books", "cloths", "sneakers", "tech"]
  const [displayItems, setDisplayItems] = useState([])
  const productContext = useContext(ProductContext)

  useEffect(() => {
    const getMainCategories = async () => {
      await fetch('data/main_categories.json').then(res=>res.json())
      .then(res => {
        setMainCategories(res)
      })
      
      const fetchedData = await Promise.all(displayCategories.map(async ele => {
        const item = await productContext.getProductFromMainCategory(ele)
        if (item.status === 'success'){
          return {category: ele, items: item.message}
        }

        return false
      }))
      setDisplayItems(fetchedData)
    }
    getMainCategories()
  }, [])

  return (
    <div className='h-body w-[99%] lg:w-[70%] flex flex-col  justify-start items-center'>
        
      <div className='w-full h-[80%]'>
        <Carousel>
        {
          posters.map((image, index) => {
            return <img key={index} alt='error' src={image} className='object-contain'/>
          })
        }
        </Carousel>
        <Categories />
        
          {
          displayItems.length > 0
          &&
          displayItems.map(ele => {
            if (ele) return <ItemRow text={ele.category.charAt(0).toUpperCase() + ele.category.slice(1)} items={ele}/>
          })
        }
      </div>
    </div>
  )
}

export default HomePage