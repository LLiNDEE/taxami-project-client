import React, { useEffect } from 'react';

import useAsync from '../hooks/useAsync';
import { post } from './request';

const buildings = params => post('/user/get/buildings', params)

const useUserBuildings = () => {

    const { isSuccess, data, ...props } = useAsync(buildings)

    return { isSuccess, data, ...props}

};

export default useUserBuildings;
