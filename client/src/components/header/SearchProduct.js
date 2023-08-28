import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProductContext } from '../../store/product-context'

function SearchProduct() {
  const navigate = useNavigate()
  const productContext = useContext(ProductContext)

  function apply_search(){
    navigate('/search')
  }
  function handle_button_down(e){

    if (e.key === 'Enter'){
      apply_search()
    }
  }

  return (
    /* 
    TODO
    SEARCH PRODUCTS
    */

    <div className='  w-[40%] h-[50%] sm:h-[70%] flex flex-row items-center'>
        <input onKeyDown={e => handle_button_down(e)}  onChange={e => productContext.setSearchString(e.target.value)} type='text' placeholder='Search' className='w-full h-[80%] my-2 pl-5 rounded-full bg-light-white font-work_sans text-sm lg:text-xl outline-none'/>
        <button onClick={apply_search} className='search-button w-[7%]  h-[80%] ml-[-30px] xl:ml-[-50px] border-l-[none]  bg-light-white rounded-full flex items-center justify-center my-2'>
            <img src={'/search.png'} alt='error' className='h-1/3'></img>
        </button>
    </div>
  )
}

export default SearchProduct