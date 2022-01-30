import { useMemo, useEffect } from 'react'

import { useGlobal } from '../providers/GlobalProvider'
import { useData } from '../providers/DataProvider'
import { AUTH_STATUSES } from '../utils/constants'

const setToken = token => sessionStorage.setItem('token', token)
const getToken = () => sessionStorage.getItem('token')

const useAuth = () => {

    const { setAuthStatus, setUserID } = useGlobal()

    const methods = useMemo(() => ({
        logInUser: data => {
            const { token, user_id } = data
            setToken(token)
            setAuthStatus(AUTH_STATUSES.loggedIn)
            setUserID(user_id)
        }
    }), [])

    return methods

}

export default useAuth

