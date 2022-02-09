import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const leaveBuilding = params => post('/building/remove/member', params)

const useLeaveBuilding = () => {
    const { isSuccess, data, ...props } = useAsync(leaveBuilding)

    return { isSuccess, data, ...props }
}

export default useLeaveBuilding