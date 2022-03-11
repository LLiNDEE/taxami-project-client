import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const removeMember = params => post('/building/remove/member', params)

const useBuildingRemoveMember = () => {

    const {isSuccess, data, ...props} = useAsync(removeMember)

    return { isSuccess, data, ...props}
 
}

export default useBuildingRemoveMember