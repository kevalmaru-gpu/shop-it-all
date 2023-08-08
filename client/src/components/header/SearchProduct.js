import React from 'react'

function SearchProduct() {
  return (
    /* 
    TODO
    SEARCH PRODUCTS
    */
    <div className='  w-[40%] h-[50%] sm:h-[70%] flex flex-row items-center'>
        
        <input type='text' placeholder='Search' className='w-full h-[80%] my-2 pl-5 rounded-full bg-light-white font-work_sans text-sm lg:text-xl outline-none'/>
        <button className='search-button w-[7%]  h-[80%] ml-[-30px] xl:ml-[-50px] border-l-[none]  bg-light-white rounded-full flex items-center justify-center my-2'>
            <img src={'/search.png'} alt='error' className='h-1/3'></img>
        </button>
    </div>
  )
}

export default SearchProduct