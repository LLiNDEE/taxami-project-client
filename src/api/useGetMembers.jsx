import React from 'react';

import useAsync from '../hooks/useAsync';
import { post } from './request'

const members = params => post('/building/get/members', params)

const useGetMembers = () => {

    const { isSuccess, data, ...props } = useAsync(members)

    return { isSuccess, data, ...props }
};

export default useGetMembers;
