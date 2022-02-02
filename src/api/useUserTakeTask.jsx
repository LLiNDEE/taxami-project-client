import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const takeTask = params => post('/user/take/task', params)

const useUserTakeTask = () => {
    const { isSuccess, data, ...props } = useAsync(takeTask)

    return { isSuccess, data, ...props }
}

export default useUserTakeTask