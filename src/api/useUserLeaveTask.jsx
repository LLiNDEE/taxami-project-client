import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const userLeaveTask = params => post('/user/leave/task', params)

const useUserLeaveTask = () => {

    const { isSuccess, data, ...props } = useAsync(userLeaveTask)

    return { isSuccess, data, ...props }
}

export default useUserLeaveTask