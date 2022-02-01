import React from 'react';

import useAsync from '../hooks/useAsync';
import { post } from './request';

const verifyCode = params => post('/user/check/code', params)

const useVerifyCode = () => {
    const { isSuccess, data, ...props } = useAsync(verifyCode)

    return { isSuccess, data, ...props}

};

export default useVerifyCode;
