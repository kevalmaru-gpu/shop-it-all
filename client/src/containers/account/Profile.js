import React, { useContext, useEffect, useState } from 'react'
import Button from '../../ui/Button'
import Input from '../../ui/Input'
import Dropdown from '../../ui/Dropdown'
import useInput from '../../hooks/use-input'
import { BsChevronDown } from 'react-icons/bs'
import cityData from '../../res/city.json'

import { UserContext } from '../../store/user-context'
import { UiContext } from '../../store/ui-context'

function Profile() {
    const userContext = useContext(UserContext)
    const uiContext = useContext(UiContext)

    const [route, updateRoute] = useState(0)
    const [menu, setMenu] = useState(false)
    const setMenuHandler = () => {
        setTimeout(setMenu(!menu), 1000)
    }
    
    const isNotEmptyValidation = (value) => value.trim !== ''

    useEffect(() => {
        if (stateValue.trim() === '') updateStateValue(userContext.userAddress.state)
    }, [])

    const {
        value: fullnameValue, 
        updateValue: updateFullnameValue, 
        isFocus: fullnameFocus, 
        focusHandler: updateFullnameFocus, 
        hasError: fullnameHasError, 
        setOtherError: fullnameOtherError
    } = useInput(isNotEmptyValidation)
    const isPersonalInfoValid = !fullnameHasError && userContext.userInformation.fullname !== fullnameValue && fullnameValue.trim() !== ''
    const updatePersonalInfoHandler = async () => {
        const response = await userContext.updateUserInfoRoute(fullnameValue)
        if (response.status === 'success') uiContext.confirmModelHandler('Personal information updated successfully', true)
        else uiContext.confirmModelHandler('Error updating personal information', true)
    }

    const {
        value: oldPassValue, 
        updateValue: updateOldPassValue, 
        isFocus: oldPassFocus, 
        focusHandler: updateOldPassFocus, 
        hasError: oldPassHasError, 
        setOtherError: oldPassOtherError
    } = useInput(isNotEmptyValidation)
    const {
        value: newPassValue, 
        updateValue: updateNewPassValue, 
        isFocus: newPassFocus, 
        focusHandler: updateNewPassFocus, 
        hasError: newPassHasError, 
        setOtherError: newPassOtherError
    } = useInput(isNotEmptyValidation)
    const isPassValid = !oldPassHasError && !newPassHasError && !oldPassValue.trim() !== ''
    const updatePasswordHandler = async () => {
        const response = await userContext.updateUserPassword(oldPassValue, newPassValue)
        if (response.status === 'success') uiContext.confirmModelHandler('Password updated successfully', true)
        else uiContext.confirmModelHandler('Error updating password',true)
    }

    const {
        value: stateValue,
        updateValue: updateStateValue, 
        isFocus: stateFocus,
        focusHandler: updateStateFocus, 
        hasError: stateHasError, 
        setOtherError: stateOtherError
    } = useInput(isNotEmptyValidation)
    const {
        value: cityValue,
        updateValue: updateCityValue, 
        isFocus: cityFocus, 
        focusHandler: updateCityFocus, 
        hasError: cityHasError, 
        setOtherError: cityOtherError
    } = useInput(isNotEmptyValidation)
    const {
        value: localityValue,
        updateValue: updateLocalityValue, 
        isFocus: localityFocus, 
        focusHandler: updateLocalityFocus, 
        hasError: localityHasError, 
        setOtherError: localityOtherError
    } = useInput(isNotEmptyValidation)
    const isAddressValid = !stateHasError && !cityHasError && !localityHasError && (
        userContext.userAddress.state !== stateValue || userContext.userAddress.city !== cityValue || userContext.userAddress.locality !== localityValue
    )
    const updateAddressHandler = async () => {
        const response = await userContext.updateUserAddressRoute(stateValue,cityValue,localityValue)
        console.log(response)
        if (response.status === 'success') uiContext.confirmModelHandler('Address updated successfully', 
        true)
        else uiContext.confirmModelHandler('Error updating Address',true)
    }

    const pages = [
        {
            name: 'Personal Information',
            design: () => {
                return <div className='w-full flex-col p-4'>
                        <h1 className='text-xl mx-1'>Update Personal Information</h1>
                    <div className='w-full flex flex-row mt-4'>
                        <Input id='full_name' label='Fullname' updateFocus={updateFullnameFocus} updateValue={updateFullnameValue} type='text' hasError={fullnameHasError} warning='Invalid fullname' defaultValue={userContext.userInformation.fullname}/>
                    </div>
                    <button disabled={!isPersonalInfoValid} onClick={updatePersonalInfoHandler}  className={"disabled:bg-gray-300 w-fit p-2 mx-1 mt-4 rounded-md bg-blue-300 hover:bg-blue-200 cursor-pointer"}>Update</button>
                </div>
            },
        },
        {
            name: 'Security',
            design: () => {
                return (
                    <div className='w-full flex-col p-4'>
                        <h1 className='text-xl mx-1'>Update Password</h1>
                        <div className='w-full flex flex-row mt-3'>
                            <Input label='Old Password' updateFocus={updateOldPassFocus} updateValue={updateOldPassValue} type='text' hasError={oldPassHasError} warning='Invalid password'/>
                            <Input label='New Password' updateFocus={updateNewPassFocus} updateValue={updateNewPassValue} type='text' hasError={newPassHasError} warning='Invalid password'/>
                        </div>
                        <button disabled={!isPassValid} onClick={updatePasswordHandler}  className={"disabled:bg-gray-300 w-fit mt-4 mx-1 p-2 rounded-md bg-blue-300 hover:bg-blue-200 cursor-pointer"}>Update</button>
                    </div>
                )
            },
        },
        {
            name: 'Address',
            design: () => {
                return (
                    <div className='w-full flex-col p-4'>
                        <h1 className='text-xl mx-1'>Update Address</h1>

                        
                        <select onChange={(e) => updateStateValue(e.target.value)} onFocus={() => updateStateFocus(true)} onBlur={() => updateStateFocus(false)} className="w-[70%] px-2.5 my-3.5 py-3.5 text-sm text-black bg-slate-300 rounded-lg border-1 border-gray-300 outline-none">
                            <option name="none" value='none'>State</option>
                            {
                                Object.keys(cityData).map((key, index) => {
                                    return <option key={index} name={key} value={key} selected={stateValue === key}>{key}</option>
                                })
                            }
                        </select>

                        <select onChange={(e) => updateCityValue(e.target.value)} onFocus={() => updateCityFocus(true)} onBlur={() => updateCityFocus(false)} className="w-[70%] px-2.5 my-3.5 py-3.5 text-sm text-black bg-slate-300 rounded-lg border-1 border-gray-300 outline-none">
                            <option name="none" value=''>City</option>
                            {
                                stateValue !== ''
                                &&
                                cityData[stateValue].map((city, index) => {
                                    return <option key={index} name={city} value={city} selected={userContext.userAddress.city === city}>{city}</option>
                                })
                            }
                        </select>

                        <Input label='Locality' updateValue={updateLocalityValue} updateFocus={updateLocalityFocus} type='text' hasError={localityHasError} warning='Invalid locality' defaultValue={userContext.userAddress.locality}/>
                        <button onClick={updateAddressHandler}  disabled={!isAddressValid} className={"disabled:bg-gray-300 mx-1 mt-2 w-fit p-2 rounded-md bg-blue-300 hover:bg-blue-200 cursor-pointer"}>Update</button>
                    </div>
                )
            }
        }
    ]
    
    return (
        <div className='px-2 w-full lg:w-[70%]  h-body font-work_sans flex flex-col justify-start items-center '>
            <div className='w-[50%] flex flex-row justify-between items-center'>
                <div className='z-30 relative w-[80%] m-4 lg:w-[50%] p-3 rounded-md bg-zinc-200 flex flex-row justify-between items-center'>
                    <h1>{pages[route].name}</h1>
                    <BsChevronDown onClick={setMenuHandler} className='bg-zinc-100 hover:bg-zinc-200 text-3xl p-2 rounded-full'/>
                    {
                        menu
                        &&
                        <div className=' absolute z-20 top-11 inset-0 w-full h-[20rem] bg-zinc-200 rounded-md flex flex-col'>
                        {
                            pages.map((element, index) => {
                                if (index === route) return

                                return <button onClick={() => {
                                    setMenu(false)
                                    updateRoute(index)
                                }} className='p-3 m-3 text-start bg-zinc-100 rounded-md hover:bg-zinc-200'>{element.name}</button>
                            })
                        }
                        </div>
                    }
                </div>
                <button onClick={userContext.logout} className={"disabled:bg-gray-300 mx-1 mt-2 w-fit h-fit p-2 rounded-md bg-blue-300 hover:bg-blue-200 cursor-pointer"}>Logout</button>
            </div>
            <div className='w-full md:w-[50%] h-fit py-5 bg-zinc-100 rounded-md flex flex-col items-center justify-start'>
                {
                    pages.map((page, index) => {
                        if (route === index) return page.design()
                    })
                }
            </div>
        </div>
    )
}

export default Profile