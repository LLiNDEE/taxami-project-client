import React from 'react';

import useAsync from '../hooks/useAsync'
import { post } from './request'

const addTask = params => post('/building/add/task', params)

const useAddTask = () => {

    const { isSuccess, data, ...props } = useAsync(addTask)

    return { isSuccess, data, ...props }

};

export default useAddTask;
