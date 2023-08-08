import React from 'react'
import { MdOutlineAccountCircle } from 'react-icons/md'

function Account() {
  return (
    <a href='/' className='font-work_sans text-sm sm:text-xl h-[40%] md:h-[50%] p-3 flex flex-row justify-center items-center rounded-full px-3 hover:bg-light-white'>
      <MdOutlineAccountCircle />
      <h1 className='mx-2 '>Account</h1>
    </a>
  )
}

export default Account