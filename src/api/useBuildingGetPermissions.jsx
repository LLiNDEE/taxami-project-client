import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const getPermissions = params => post('/building/get/permissions', params)

const useBuildingGetPermissions = () => {
    const { isSuccess, data, ...props } = useAsync(getPermissions)

    return { isSuccess, data, ...props }
}

export default useBuildingGetPermissions