import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const removeCustomer = params => post('/admin/remove/customer', params)

const useAdminRemoveCustomer = () => {
    const { isSuccess, data, ...props } = useAsync(removeCustomer)
    
    return { isSuccess, data, ...props }
}

export default useAdminRemoveCustomer