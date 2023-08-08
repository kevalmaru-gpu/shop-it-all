import React from 'react'

function InformationBar() {
  return (
    <div className='font-work_sans w-full h-[30%] text-white bg-lime-950 flex justify-between'>
        <div className='px-2 w-1/2 flex flex-row justify-start items-center'>
          <img src={'/phone.png'} alt='error' className='px-1 h-[50%]'></img>
          <h1>+91636396594591</h1>
        </div>
        <div className='w-1/2 px-2 flex justify-end'>
          <select className='bg-lime-950'>
            <option className='English'>English</option>
            <option value='Spanish'>Spanish</option>
          </select>
        </div>
        <div>
        </div>
    </div>
  )
}

export default InformationBar