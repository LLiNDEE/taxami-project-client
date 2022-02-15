import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const generateCode = params => post('/admin/generate/code', params)

const useAdminGenerateCode = () => {

    const { isSuccess, data, ...props } = useAsync(generateCode)

    return { isSuccess, data, ...props }

}

export default useAdminGenerateCode