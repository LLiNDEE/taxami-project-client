import React, { useState, useEffect, useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'

import useUserTakeTask from '../api/useUserTakeTask'
import useAddTask from '../api/useAddTask'
import useUserLeaveTask from '../api/useUserLeaveTask'
import { useGlobal } from './GlobalProvider'
import useAddPermission from '../api/useAddPermission'

const contextMenu = createContext({})

const MenuProvider = ({ children }) => {


    const { setRefreshPage, setModalData, modalData } = useGlobal()

    const { execute: executeTakeTask, isSuccess: takeTaskSuccess, isError: takeTaskError } = useUserTakeTask()
    const { execute: executeAddTask, isSuccess: addTaskSuccess, isError: addTaskError } = useAddTask()
    const { execute: executeLeaveTask, isSuccess: leaveTaskSuccess, isError: leaveTaskError } = useUserLeaveTask()
    const { execute: executeAddPermission, isSucess: addPermissionSuccess, isError: addPermissionError } = useAddPermission()

    useEffect(() => {
        if(!takeTaskSuccess) return

        console.log("Take task success", takeTaskSuccess)
        setRefreshPage(true)

    },[takeTaskSuccess])

    useEffect(() => {
        if(!addTaskSuccess) return

        setRefreshPage(true)

    },[addTaskSuccess])

    useEffect(() => {
        if(!leaveTaskSuccess) return

        setRefreshPage(true)

    },[leaveTaskSuccess])

    useEffect(() => {
        if(!addPermissionSuccess) return

        setRefreshPage(true)

    },[addPermissionSuccess])

    return (
        <contextMenu.Provider value={{ executeTakeTask, setModalData, modalData, executeAddTask, executeLeaveTask, executeAddPermission }}>
            {children}
        </contextMenu.Provider>
    )
}


export const useMenu = () => useContext(contextMenu)

export default MenuProvider


