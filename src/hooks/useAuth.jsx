import { useMemo, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

import { useGlobal } from '../providers/GlobalProvider'
import { useData } from '../providers/DataProvider'
import { AUTH_STATUSES } from '../utils/constants'
import { convertMicroToMilli } from '../utils/utils'

const setToken = token => sessionStorage.setItem('token', token)
const removeToken = () => sessionStorage.removeItem('token')
const getToken = () => sessionStorage.getItem('token')

const getSessionStorage = (key) => sessionStorage.getItem(key)
const setSessionStorage = (key, value) => sessionStorage.setItem(key, value)
const removeSessionStorage = key => sessionStorage.removeItem(key)

export const validateToken = () => {
    const token = getToken()

    if(!token) return false

    const decodedToken = jwt_decode(token)
    if(!decodedToken) return false

    const timeInMicroseconds = Date.now()
    const timeInMilliseconds = convertMicroToMilli(timeInMicroseconds)
    if(timeInMilliseconds > decodedToken.exp) return false
    
    return true
}

const useAuth = () => {

    const { setAuthStatus, setUserID, setUserRole, setUserData } = useGlobal()

    const methods = useMemo(() => ({
        logInUser: data => {
            const { token, user_id, role, first_name, last_name, email } = data
            setToken(token)
            setAuthStatus(AUTH_STATUSES.loggedIn)
            setUserRole(role)
            setUserID(user_id)
            setUserData(data)

            const userInformation = {
                first_name: first_name,
                last_name: last_name,
                email: email,
            }

            setSessionStorage("userData", JSON.stringify(userInformation))
        },
        logoutUser: () => {
            setAuthStatus(AUTH_STATUSES.idle)
            setUserID(undefined)
            removeToken()
            removeSessionStorage('userData')
        },
        validateSession: () => {
            if(validateToken) return true

            return false
        },
        refreshUUID: () => {
            const decodedToken = jwt_decode(getToken())
            const userData = JSON.parse(getSessionStorage('userData'))
            // const userData = getSessionStorage('userData')
            setUserID(decodedToken.data.uuid)
            setUserRole(decodedToken.data.role)
            setUserData(userData)
        }
    }), [])

    return methods

}

export default useAuth

