import React from 'react'

import useAsync from '../hooks/useAsync'
import { post } from './request'

const tasks = params => post('/building/get/tasks', params)

const useBuildingTasks = () => {

    const { isSuccess, data, ...props } = useAsync(tasks)

    return {isSuccess, data, ...props}

}

export default useBuildingTasks