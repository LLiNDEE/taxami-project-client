import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const getRole = params => post('/user/get/role', params)

const useGetRole = () => {

    const { isSuccess, data, ...props } = useAsync(getRole)

    return { isSuccess, data, ...props }

}

export default useGetRole