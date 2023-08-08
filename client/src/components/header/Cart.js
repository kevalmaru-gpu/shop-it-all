import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from "react-router-dom"

function Cart() {
  return (
    <Link to='/cart' className='font-work_sans text-sm sm:text-xl h-[40%] md:h-[50%] p-3 flex flex-row justify-center items-center rounded-full px-3 hover:bg-light-white'>
      <AiOutlineShoppingCart />
      <h1 className='mx-2 '>Cart</h1>
    </Link>
  )
}

export default Cart