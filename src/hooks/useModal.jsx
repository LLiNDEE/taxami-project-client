import React, { useCallback, useState } from 'react';

const STATUS = {
    HIDDEN: 'HIDDEN',
    SHOWN: 'SHOWN'
}

const VARIANTS = {
    leaveTask: 'leaveTask',
    takeTask: 'takeTask',
    completeTask: 'completeTask',
    removeCompletedTask: 'removeCompletedTask',
    addTask: 'addTask',
    removeTask: 'removeTask'
}

const useModal = () => {

    const [variant, setVariant] = useState(undefined)
    const [status, setStatus] = useState(undefined)

    const showVariant = useCallback(params => {
        if(!VARIANTS[params]) return
        setVariant(params)
        setStatus(STATUS.SHOWN)
    }, [])

    const hideVariant = useCallback(() => {
        setVariant(undefined)
        setStatus(STATUS.HIDDEN)
    }, [])

  return {showVariant, hideVariant, variant, status};
};

export default useModal;
