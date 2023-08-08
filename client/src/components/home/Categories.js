import React from 'react'
import 'animate.css';
import '../../App.css'

const categoriesPictures = [
    {path:'categories/furniture.jpg', name:'Furniture'},
    {path:'categories/books.jpg', name:'Books'},
    {path:'categories/cloths.jpg', name:'Cloths'},
    {path:'categories/snekers.jpg', name:'Sneakers'},
    {path:'categories/tech.jpg', name:'Tech'},
]

function Categories() {
    return (
        <div className='w-full h-fit font-work_sans p-4  flex flex-col'>
            <h1 className='text-2xl md:text-3xl font-[600] pt-[5rem]'>Shop Our Best Categories</h1>
            <div className='w-full h-fit mt-5 overflow-auto flex flex-row flex-wrap'>
                {
                    categoriesPictures.map((picture, index) => {
                    return <div key={index} className='relative mr-2 my-2 w-[10rem] lg:w-52 overflow-hidden h-auto rounded-lg flex flex-row '>
                                    <img src={picture.path} className='w-full bg-center rounded-md hover:scale-125 transition-all delay-150'/>
                                    <h1 className='absolute w-full flex font-bold text-white justify-center'>{picture.name}</h1>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default Categories