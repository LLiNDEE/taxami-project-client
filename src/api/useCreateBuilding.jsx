import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const createBuilding = params => post('/building/create', params)

const useCreateBuilding = () => {

    const { isSuccess, data, ...props } = useAsync(createBuilding)

    return { isSuccess, data, ...props }

}

export default useCreateBuilding