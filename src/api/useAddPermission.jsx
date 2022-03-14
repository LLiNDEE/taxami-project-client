import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const addPermission = params => post('/building/add/permissions', params)

const useAddPermission = () => {

  const { isSuccess, data, ...props} = useAsync(addPermission)

  return { isSuccess, data, ...props}

}

export default useAddPermission