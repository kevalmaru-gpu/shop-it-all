import { createContext, useContext, useState } from "react";
import secureLocalStorage from 'react-secure-storage'
import { UiContext } from "./ui-context";

const UserContext = createContext({
    userInformation:{ fullname: '' },
    userAddress: { locality: '', city: '', state: '' }, registerUser: () => {}, loginUser: () => {}, sendOtp: () => {}, getOtp: () => {}, verifyUser: () => {}, registerAddress: () => {}, updateUserAddress: () => {}, updateUserInformation: () => {}, updateUserInfoRoute: () => {}, updateUserPassword: () => {}, logout: () => {}, updateUserAddressRoute: () => {} })

const UserProvider = ({children}) => {
    const uiContext = useContext(UiContext)

    const [userInformation, updateUserInformation] = useState({ fullname: '' })
    const [userAddress, updateUserAddress] = useState({ locality: '', city: '', state: '' })
    
    const getOtp = () => {
        return (Math.floor(Math.random() * (9999,1000)) + 1000).toString()
    }

    const sendOtp = async (data) => {
        const mailData = {
            email: data.email,
            subject: "Welcome to Shop It!",
            text: `Thank you for choosing ShopIt\nYour OTP is ${data.otp}`
        }

        await fetch('http://localhost:8000/service/send_email', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(mailData)
        })
    }

    const registerUser = async (data) => {
        const response = await fetch('http://localhost:8000/user/register/info', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        return response
    }

    const registerAddress = async (data) => {
        const response = await fetch('http://localhost:8000/user/register/address', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        return response
    }
    
    const loginUser = async (username, password) => {
        const data = {
            username: username,
            password: password
        }

        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data) 
        })
        .then(response => response.json())
        .then(json_response => {
            if (json_response.status === 'success'){
                secureLocalStorage.setItem('token', json_response.body.token)
                updateUserInformation(json_response.body.info)
                updateUserAddress(json_response.body.address)            
            }
            return json_response
        })
        .catch(err => {
            return {status: 'failed'}
        })

        return response
    }

    const updateUserInfoRoute = async (new_fullname) => {
        const data = {
            token: secureLocalStorage.getItem('token'),
            old_fullname: userInformation.fullname,
            new_fullname: new_fullname
        }

        const response = await fetch('http://localhost:8000/user/update/info', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json_response => {
            
            if (json_response.status === 'success'){
                const updatedInfo = userInformation;
                updatedInfo.fullname = new_fullname
                updateUserInformation(updatedInfo)
            }

            return json_response
        })

        return response
    }
    const updateUserPassword = async (old_password, new_password) => {
        const token = secureLocalStorage.getItem('token')

        const data = {
            token,
            old_password,
            new_password
        }

        const response = await fetch('http://localhost:8000/user/update/password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json_response => {
            return json_response
        })
        return response
    }

    const updateUserAddressRoute = async (state, city, locality) => {
        const token = secureLocalStorage.getItem('token')

        const data = {
            token,
        state,
            city,
            locality
        }

        const response = await fetch('http://localhost:8000/user/update/address', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json_response => {
            if (json_response.status === 'success'){
                const _updatedUserAddress = userAddress
                _updatedUserAddress.state = state
                _updatedUserAddress.city = city
                _updatedUserAddress.locality = locality
                updateUserAddress(_updatedUserAddress)

                return json_response
            }
        })
        return response
    }

    const logout = async () => {
        secureLocalStorage.clear('token')
        window.location.pathname = '/login'
    }

    

    return (
        <UserContext.Provider value={{userInformation: userInformation, userAddress: userAddress, loginUser: loginUser, registerUser: registerUser, sendOtp: sendOtp, getOtp: getOtp, registerAddress: registerAddress, updateUserInformation: updateUserInformation, updateUserAddress: updateUserAddress, updateUserInfoRoute: updateUserInfoRoute, updateUserPassword: updateUserPassword, logout: logout, updateUserAddressRoute: updateUserAddressRoute
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }