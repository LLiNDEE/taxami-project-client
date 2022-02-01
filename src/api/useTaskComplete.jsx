import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const taskComplete = params => post('/user/complete/task', params)

const useTaskComplete = () => {
    const { isSuccess, data, ...props } = useAsync(taskComplete)

    return {isSuccess, data, ...props}
}

export default useTaskComplete
