import React, { useState, useReducer, useContext } from 'react'
import Input from '../../ui/Input'
import Dropdown from '../../ui/Dropdown'
import Button from '../../ui/Button'

import { UserContext } from '../../store/user-context'
import { AuthContext } from '../../store/auth-context'

import cityData from '../../res/city.json'
import useInput from '../../hooks/use-input'

function RegisterForm() {
    const userContext = useContext(UserContext)
    const authContext = useContext(AuthContext)

    // ! this will fix address re-render bug
    const [cities, updateCities] = useState([])

    // * input hook
    const usernameValidation = (value) => value.trim() !== ''
    const emailValidation = (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    const passwordValidation = (value) => true
    const otpValidation = (value) => value.length === 4

    const {
        value: usernameValue, 
        updateValue: updateUsernameValue, 
        isFocus: usernameFocus, 
        focusHandler: updateUsernameFocus, 
        hasError: usernameHasError, 
        setOtherError: usernameOtherError
    } = useInput(usernameValidation)
    const {
        value: fullnameValue, 
        updateValue: updateFullnameValue, 
        isFocus: fullnameFocus, 
        focusHandler: updateFullnameFocus, 
        hasError: fullnameHasError, 
        setOtherError: fullnameOtherError
    } = useInput(usernameValidation)
    const {
        value: emailValue, 
        updateValue: updateEmailValue, 
        isFocus: emailFocus, 
        focusHandler: updateEmailFocus, 
        hasError: emailHasError, 
        setOtherError: emailOtherError
    } = useInput(emailValidation)
    const {
        value: passwordValue,
        updateValue: updatePasswordValue, 
        isFocus: passwordFocus, 
        focusHandler: updatePasswordFocus, 
        hasError: passwordHasError, 
        setOtherError: passwordOtherError
    } = useInput(usernameValidation)
    const {
        value: genderValue,
        updateValue: updateGenderValue, 
        isFocus: genderFocus, 
        focusHandler: updateGenderFocus, 
        hasError: genderHasError, 
        setOtherError: genderOtherError
    } = useInput(usernameValidation)
    const isFieldValid = usernameValidation(genderValue) && !usernameHasError && !fullnameHasError && !emailHasError && !passwordHasError


    const {
        value: OTPValue,
        updateValue: updateOTPValue, 
        isFocus: OTPFocus, 
        focusHandler: updateOTPFocus, 
        hasError: OTPHasError, 
        setOtherError: OTPOtherError
    } = useInput(otpValidation)
    const isOTPFieldValid = !OTPHasError

    const {
        value: stateValue,
        updateValue: updateStateValue, 
        isFocus: stateFocus,
        focusHandler: updateStateFocus, 
        hasError: stateHasError, 
        setOtherError: stateOtherError
    } = useInput(usernameValidation)
    const {
        value: cityValue,
        updateValue: updateCityValue, 
        isFocus: cityFocus, 
        focusHandler: updateCityFocus, 
        hasError: cityHasError, 
        setOtherError: cityOtherError
    } = useInput(usernameValidation)
    const {
        value: localityValue,
        updateValue: updateLocalityValue, 
        isFocus: localityFocus, 
        focusHandler: updateLocalityFocus, 
        hasError: localityHasError, 
        setOtherError: localityOtherError
    } = useInput(usernameValidation)
    const isAddressValid = !stateHasError && !cityHasError && !localityHasError

    // * routing part 
    const [route, updateRoute] = useState(0)
    const [id, setId] = useState('')
    const [generatedOtp, setGeneratedOtp] = useState('')

    const routeHandler = async (event) => {
            event.preventDefault()

            // * if on register route
            if (route === 0 && isFieldValid){
                // * send otp
                const otp = userContext.getOtp()
                setGeneratedOtp(otp)

                // userContext.sendOtp({ email: fieldState.email, otp: otp })
                updateRoute(route+1)
            }

            // * if on opt route
            if (route === 1 ){ // && isOtpValid
                //  verify otp 
                if (generatedOtp === OTPValue){
                    OTPOtherError(true)
                    return
                }
                else {
                    //  register user
                    const data = {
                        fullname: fullnameValue,
                        username: usernameValue,
                        gender: genderValue,
                        email: emailValue,
                        password: passwordValue
                    }
                    const registerRes = await userContext.registerUser(data)

                    if (registerRes.status === 'success'){
                        setId(registerRes.body._id)
                        updateRoute(route+1)
                    }
                    else{
                        updateRoute(route-1)
                        usernameOtherError(true)
                    }
                }
            }

            // * if on address route
            if (route === 2 && isAddressValid){
                //  skip or address api call
                const data = {
                    customer_id: id,
                    state: stateValue,
                    city: cityValue,
                    locality: localityValue,
                    address: `${localityValue}, ${cityValue}, ${stateValue}`
                }
                await userContext.registerAddress(data)
                authContext.updateIsLoggedIn(true)
                // ! RISKY
                window.location.pathname = '/'
            }
    }

    // * pages views

    const pages = [ 
        {
            id: 0,
            name: "credential",
            design: () => {
                return <form className='w-full h-full flex items-center flex-col'>
                    <div className='my-8 flex items-center flex-col'>
                        <div className='font-bold text-xl lg:text-3xl'>Welcome,</div>
                        <div className='w-[90%] md:w-[9rem] text-center text-sm lg:text-xl'>Register yourself</div>
                    </div>
                    
                    <Input label='Fullname' updateValue={updateFullnameValue} updateFocus={updateFullnameFocus} type='text' hasError={fullnameHasError} warning='Invalid fullname'/>
                    <Input label='Username' updateValue={updateUsernameValue} updateFocus={updateUsernameFocus} type='text' hasError={usernameHasError} warning='Invalid username'/>
                    <Input label='Email' updateValue={updateEmailValue} updateFocus={updateEmailFocus} type='text' hasError={emailHasError} warning='Invalid email'/>
                    <Input label='Password' updateValue={updatePasswordValue} updateFocus={updatePasswordFocus} type='text' hasError={passwordHasError} warning='Invalid username'/>
                    <Dropdown label='Gender' hasError={genderHasError} updateValue={updateGenderValue} updateFocus={updateGenderFocus} items={[{name:'male',value:'Male'},{name:'female',value:'Female'}]}/>
                    
                    
                    <button disabled={!isFieldValid} onClick={routeHandler} className={'w-[70%] my-6 p-2 rounded-lg text-lg bg-blue-300 hover:bg-blue-200 disabled:bg-gray-300'}>Verify</button>
                </form>
            }
        },
        {
            id: 1,
            name: "otp",
            design: () => {
                return <form className='w-full h-full flex items-center flex-col'>
                    <div className='my-8 flex items-center flex-col'>
                        <div className='w-full m-2 md:w-[9rem] text-center text-vsm lg:text-sm'>We have sent OPT to {emailValue}</div>
                    </div>
                    <Input label='OTP' updateValue={updateOTPValue} updateFocus={updateOTPFocus} type='text' hasError={OTPHasError} warning='Invalid username'/>
                    <button disabled={!isOTPFieldValid} onClick={routeHandler} className={'w-[70%] my-6 p-2 rounded-lg text-lg bg-blue-300 hover:bg-blue-200 disabled:bg-gray-300'}>Verify</button>
                </form>
            }
        },
        {
            id: 2,
            name:"address",    
            design: () => {
                return <form className='w-full h-full flex items-center flex-col'>
                    <div className='my-8 flex items-center flex-col'>
                        <div className='font-bold text-xl lg:text-3xl'>Your Address</div>
                        <div className='w-[90%] md:w-[9rem] text-center text-sm lg:text-xl'></div>
                    </div>

                    
                    <select onChange={(e) => updateStateValue(e.target.value)} onFocus={() => updateStateFocus(true)} onBlur={() => updateStateFocus(false)} className="w-[70%] px-2.5 my-3.5 py-3.5 text-sm text-black bg-slate-300 rounded-lg border-1 border-gray-300 outline-none">
                        <option name="none" value='none'>State</option>
                        {
                            Object.keys(cityData).map((key, index) => {
                                return <option key={index} name={key} value={key}>{key}</option>
                            })
                        }
                    </select>

                    <select onChange={(e) => updateCityValue(e.target.value)} onFocus={() => updateCityFocus(true)} onBlur={() => updateCityFocus(false)} className="w-[70%] px-2.5 my-3.5 py-3.5 text-sm text-black bg-slate-300 rounded-lg border-1 border-gray-300 outline-none">
                        <option name="none" value=''>City</option>
                        {
                            stateValue.trim() !== ''
                            &&
                            cityData[stateValue].map((city, index) => {
                                return <option key={index} name={city} value={city}>{city}</option>
                            })
                        }
                    </select>

                    <Input label='Locality' updateValue={updateLocalityValue} updateFocus={updateLocalityFocus} type='text' hasError={localityHasError} warning='Invalid locality'/>
                    <button disabled={!isAddressValid} onClick={routeHandler} className={'w-[70%] my-6 p-2 rounded-lg text-lg bg-blue-300 hover:bg-blue-200 disabled:bg-gray-300'}>Verify</button>
                </form>
            }
        }
    ]

    return (
        <div className='w-full md:w-1/2 h-fit mx-5 py-8 flex flex-col justify-start items-center rounded-md shadow-xl font-work_sans bg-slate-200'>
            {
                // * displaying page according to route
                pages.map(page => {
                    if (page.id === route)
                        return page.design()
                })
            }
            { (route !== 0 && route !== 2) && <Button text='Back' method={() => {updateRoute(route-1)}} className='w-[70%] flex justify-start'/> }
            <h1 className='h-[30%] mt-5 flex items-end'>Already a member? <a href='#' className='text-blue-400'> &nbsp; Login here</a></h1>
        </div>
    )
}

export default RegisterForm