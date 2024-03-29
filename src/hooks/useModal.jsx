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
    removeTask: 'removeTask',
    leaveBuilding: 'leaveBuilding',
    createBuilding: 'createBuilding',
    joinBuilding: 'joinBuilding',
    viewTask: 'viewTask',
    viewInProgressTask: 'viewInProgressTask',
    removeMember: 'removeMember',
    buildingPermissions: 'buildingPermissions',
    viewMember: 'viewMember',
}

const useModal = () => {

    const [variant, setVariant] = useState(undefined)
    const [status, setStatus] = useState(undefined)
    const [data, setData] = useState(undefined)

    const showVariant = useCallback((params, data) => {
        if(!VARIANTS[params]) return
        setVariant(params)
        setStatus(STATUS.SHOWN)
        if(data) setData(data)
    }, [])

    const hideVariant = useCallback(() => {
        setVariant(undefined)
        setStatus(STATUS.HIDDEN)
    }, [])

  return {showVariant, hideVariant, variant, status, data, setData};
};

export default useModal;
