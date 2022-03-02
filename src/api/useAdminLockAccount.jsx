import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const lockAccount = params => post("/admin/lock/account", params)

const useAdminLockAccount = () => {
    const { isSuccess, data, ...props } = useAsync(lockAccount)

    return { isSuccess, data, ...props }
}

export default useAdminLockAccount