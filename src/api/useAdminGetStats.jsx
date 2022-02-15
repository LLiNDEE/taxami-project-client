import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const getStats = params => post('/admin/get/stats', params)

const useAdminGetStats = () => {

    const { isSuccess, data, ...props } = useAsync(getStats)

    return {isSuccess, data, ...props}

}

export default useAdminGetStats