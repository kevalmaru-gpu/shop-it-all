import React, { useContext } from 'react'
import Input from '../../ui/Input'

import { UserContext } from '../../store/user-context'
import { AuthContext } from '../../store/auth-context'

import useInput from '../../hooks/use-input'
import secureLocalStorage from 'react-secure-storage'

function LoginForm() {
    const userContext = useContext(UserContext)

    const usernameValidation = (value) => value.trim() !== ''
    const passwordValidation = (value) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)
    
    // ! TODO remove this later
    const tempValidation = (value) => true

    const {
        value: userInput,
        updateValue: updateUserInput,
        focusHandler: updateUserInputFocus,
        hasError: userInputError,
        setOtherError: setOtherUserError
    } = useInput(usernameValidation)

    const {
        value: passInput,
        updateValue: updatePassInput,
        focusHandler: updatePassInputFocus,
        hasError: passInputError,
        setOtherError: setOtherPassError
    } = useInput(tempValidation)

    const isFormValid = (!userInputError && !passInputError ) || (userInput.trim() !== '')

    const loginHandler = async (event) => {
        event.preventDefault()
        const loginRes = await userContext.loginUser(userInput, passInput)

        
        if (loginRes.status === 'failed'){
            setOtherUserError(true)
            setOtherPassError(true)
        } else {
            // ! RISKY
            window.location.pathname = '/'
        }
    }
    
    const loginDesign = () => {
        return (
            <form onSubmit={loginHandler} className='w-full lg:w-1/2 h-[90%] flex flex-col justify-center items-center rounded-md shadow-xl font-work_sans bg-slate-200'>
                <div className='my-8 flex items-center flex-col'>
                    <div className='font-bold text-xl lg:text-3xl'>Hello Again!</div>
                    <div className='w-[90%] md:w-[9rem] text-center text-sm lg:text-xl'>Welcome back you've been missed!</div>
                </div>
                    
                <Input  type='text' label='Username' updateValue={updateUserInput} updateFocus={updateUserInputFocus} hasError={userInputError} warning='Invalid username'/>
                    
                <Input  type='password' label='Password' updateValue={updatePassInput} updateFocus={updatePassInputFocus} hasError={passInputError} warning='Invalid password'/>        

                <button disabled={!isFormValid} type='submit' className='disabled:bg-gray-300 w-[70%] my-6 p-2 rounded-lg text-lg bg-blue-300 hover:bg-blue-200'>Sign In</button>

                <h1 className='my-3 h-[30%] flex items-end'>Not a member? <a href='/register' className='text-blue-400'> &nbsp; Register now</a></h1>
            </form>
        )
    }

    return (
        <div className='w-full lg:w-1/2 h-full mx-5 py-5 flex flex-col justify-center items-center '>
            { loginDesign() }
        </div>
    )
}

export default LoginForm