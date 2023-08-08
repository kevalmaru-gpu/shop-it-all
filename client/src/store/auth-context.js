import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "./user-context";

const AuthContext = createContext({ isLoggedIn: '', verifyUser: () => {} , updateIsLoggedIn: () => {}})
const AuthProvider = ({children}) => {
    const userContext = useContext(UserContext)
    const [isLoggedIn, updateIsLoggedIn] = useState(false)

    const verifyUser = async () => {
        if (secureLocalStorage.getItem('token')){
            const data = { token: secureLocalStorage.getItem('token') }
            const response = await fetch('http://localhost:5000/user/verify', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json_response => {
                if (json_response.status === 'success'){
                    userContext.updateUserInformation(json_response.body.info)
                    userContext.updateUserAddress(json_response.body.address)
                }
                return json_response
            })
            return response
        }
        else return { status: 'failed' }
    }
    
    const values = {
        isLoggedIn: isLoggedIn,
        verifyUser: verifyUser,
        updateIsLoggedIn: updateIsLoggedIn
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
