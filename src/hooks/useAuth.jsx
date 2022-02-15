import { useMemo, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

import { useGlobal } from '../providers/GlobalProvider'
import { useData } from '../providers/DataProvider'
import { AUTH_STATUSES } from '../utils/constants'
import { convertMicroToMilli } from '../utils/utils'

const setToken = token => sessionStorage.setItem('token', token)
const removeToken = () => sessionStorage.removeItem('token')
const getToken = () => sessionStorage.getItem('token')

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

    const { setAuthStatus, setUserID, setUserRole } = useGlobal()

    const methods = useMemo(() => ({
        logInUser: data => {
            const { token, user_id, role } = data
            setToken(token)
            setAuthStatus(AUTH_STATUSES.loggedIn)
            setUserRole(role)
            setUserID(user_id)
        },
        logoutUser: () => {
            setAuthStatus(AUTH_STATUSES.idle)
            setUserID(undefined)
            removeToken()
        },
        validateSession: () => {
            if(validateToken) return true

            return false
        },
        refreshUUID: () => {
            const decodedToken = jwt_decode(getToken())
            setUserID(decodedToken.data.uuid)
            setUserRole(decodedToken.data.role)
        }
    }), [])

    return methods

}

export default useAuth

