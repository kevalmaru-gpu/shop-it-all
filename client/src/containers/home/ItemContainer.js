import React from 'react'
import ItemSlot from './ItemSlot'

function ItemContainer(props) {
    const { text } = props

    return (
        <div className='w-full overflow-auto  mt-8 flex flex-col'>
                <h1 className='pl-4 text-2xl md:text-3xl font-bold'>{text}</h1>
                
                <div className='ml-4 w-full overflow-auto mt-4 flex flex-row'>
                    <ItemSlot />
                    <ItemSlot />
                    <ItemSlot />
                    <ItemSlot />
                    <ItemSlot />
                    <ItemSlot />
                </div>
            </div>
    )
}

export default ItemContainer