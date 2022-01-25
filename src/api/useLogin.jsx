import React, { useEffect } from 'react'

import useAsync from '../hooks/useAsync'
import useAuth from '../hooks/useAuth'
import { post } from './request'
import { useGlobal } from '../providers/GlobalProvider'

const login = params => post('/user/login', params)

const useLogin = () => {
    const { isSuccess, data, ...props } = useAsync(login)
    
    const { setUserID, setBuildings } = useGlobal()

    const auth = useAuth()

    useEffect(() => {
        if(!isSuccess) return

        console.log("SUCCESSFULL LOGIN", data)
        auth.logInUser(data.data)

        setUserID(data.data.user_id)
        setBuildings(data.data.memberOf)

    },[isSuccess])

    return { isSuccess, data, ...props }

}

export default useLogin