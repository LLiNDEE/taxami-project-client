import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const userUpdate = params => post('/user/update', params)

const useUserUpdate = () => {
    const { isSuccess, data, ...props } = useAsync(userUpdate)

    return { isSuccess, data, ...props }

}

export default useUserUpdate