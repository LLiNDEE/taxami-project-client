import React, { createContext, useContext, useEffect, useState } from 'react'

import useUserData from '../api/useUserData'
import { AUTH_STATUSES } from '../utils/constants'

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA } = useUserData()

    const [authStatus, setAuthStatus] = useState(AUTH_STATUSES.idle)

    const [userID, setUserID] = useState(undefined)
    const [buildings, setBuildings] = useState(undefined)
    const [tasks, setTasks] = useState(undefined)

    useEffect(() => {
        if(!userID || !buildings) return

        getTasks({user_id: userID})

    },[userID, buildings])

    useEffect(() => {
        if(!tasksDATA) return

        setTasks(tasksDATA.data.tasks)

    },[tasksDATA])

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus, setUserID, userID, buildings, setBuildings, setTasks, tasks }}>
            <div className="page">
                {children}
            </div>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider