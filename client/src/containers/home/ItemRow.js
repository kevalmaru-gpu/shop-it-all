import React from 'react'
import ItemSlot from '../../components/home/ItemSlot'

function ItemRow(props) {
    const { text, items } = props

    return (
        <div className='w-full mt-20 flex flex-col'>
            <h1 className='pl-4 text-2xl md:text-3xl font-bold'>{text}</h1>
                
            <div className='pl-4  w-full overflow-auto mt-4 flex flex-row'>
                {
                    items.items.map(ele => {
                        if (ele) {
                            return <ItemSlot data={ele}/>
                        }
                    })
                }
            </div>
        </div>
    )
}

export default ItemRow