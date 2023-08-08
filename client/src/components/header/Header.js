import React from 'react'
import './Header.css'
import Account from './Account'
import SearchProduct from './SearchProduct'
import Logo from './Logo'
import Cart from './Cart'
 

function Header() {
  return (
    <div className='w-full lg:w-[70%] z-[10] px-1 h-header flex justify-between items-center font-work_sans'>
      <Logo />
      <SearchProduct />
      <Cart />
      <Account />  
    </div>
  )
}

export default Header