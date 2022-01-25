import React, { useEffect } from 'react'

import useAsync from '../hooks/useAsync'
import useAuth from '../hooks/useAuth'
import { post } from './request'

const login = params => post('/user/login', params)

const useLogin = () => {
    const { isSuccess, data, ...props } = useAsync(login)

    const auth = useAuth()

    useEffect(() => {
        if(!isSuccess) return


        console.log("SUCCESSFULL LOGIN", data)
        auth.logInUser(data.data)
    },[isSuccess])

    return { isSuccess, data, ...props }

}

export default useLogin