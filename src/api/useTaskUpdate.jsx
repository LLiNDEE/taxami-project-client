import React, { useEffect } from 'react';

import useAsync from '../hooks/useAsync';
import { post } from './request';

const updateTask = params => post('/building/update/task', params)

const useTaskUpdate = () => {

    const { isSuccess, data, ...props } = useAsync(updateTask)

    return { isSuccess, data, ...props}

};

export default useTaskUpdate;
