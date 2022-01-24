import React, { useEffect } from 'react'

import useAsync from '../hooks/useAsync.jsx'
import { post } from './request.js'

const login = params => post('/user/login', params)

const useLogin = () => {
    const { isSuccess, data, ...props } = useAsync(login)

    useEffect(() => {
        if(!isSuccess) return


        console.log("SUCCESSFULL LOGIN", data)
    },[isSuccess])

    return { isSuccess, data, ...props }

}

export default useLogin