import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const removeTask = params => post('/building/remove/task', params)

const useRemoveTask = () => {
    const { isSuccess, data, ...props } = useAsync(removeTask)

    return { isSuccess, data, ...props }
}

export default useRemoveTask