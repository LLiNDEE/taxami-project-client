import { useEffect } from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const userData = params => post('/user/get/tasks', params)

const useUserData = () => {
    const { isSuccess, data, ...props } = useAsync(userData)

    useEffect(() => {
        if(!isSuccess) return

    },[isSuccess])

    return { isSuccess, data, ...props }

}

export default useUserData

