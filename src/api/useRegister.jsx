import React from 'react';

import useAsync from '../hooks/useAsync';
import { post } from './request';

const register = params => post('/user/create', params)

const useRegister = () => {
    const { isSuccess, data, ...props } = useAsync(register)

    return { isSuccess, data, ...props }

};

export default useRegister;
