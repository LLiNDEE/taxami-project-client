import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const joinBuilding = params => post('/user/join', params)

const useJoinBuilding = () => {
    const { isSuccess, data, ...props } = useAsync(joinBuilding)

    return { isSuccess, data, ...props }

}

export default useJoinBuilding