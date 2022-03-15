import React, { useState, useEffect, useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'

import useUserTakeTask from '../api/useUserTakeTask'
import useAddTask from '../api/useAddTask'
import useUserLeaveTask from '../api/useUserLeaveTask'
import { useGlobal } from './GlobalProvider'

const contextMenu = createContext({})

const MenuProvider = ({ children }) => {


    const { setRefreshPage, setModalData, modalData } = useGlobal()

    const { execute: executeTakeTask, isSuccess: takeTaskSuccess, isError: takeTaskError } = useUserTakeTask()
    const { execute: executeAddTask, isSuccess: addTaskSuccess, isError: addTaskError } = useAddTask()
    const { execute: executeLeaveTask, isSuccess: leaveTaskSuccess, isError: leaveTaskError } = useUserLeaveTask()

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

    return (
        <contextMenu.Provider value={{ executeTakeTask, setModalData, modalData, executeAddTask, executeLeaveTask }}>
            {children}
        </contextMenu.Provider>
    )
}


export const useMenu = () => useContext(contextMenu)

export default MenuProvider


