import React from 'react'
import RegisterForm from '../../components/forms/RegisterForm'

function Register() {
    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-full lg:w-1/2 h-full flex justify-center items-center'>
                <RegisterForm/>
            </div>
            <div className='w-1/2 h-full hidden lg:flex items-center justify-center'>
                <img src={'signin/vector_1.jpg'}></img>
            </div>
        </div>
    )
}

export default Register