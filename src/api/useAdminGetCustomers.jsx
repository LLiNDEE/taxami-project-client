import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const getCustomers = params => post('/admin/get/customers', params)

const useAdminGetCustomers = () => {

    const { isSuccess, data, ...props } = useAsync(getCustomers)

    return { isSuccess, data, ...props}

}

export default useAdminGetCustomers