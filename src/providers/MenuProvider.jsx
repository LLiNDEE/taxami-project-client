import React, { useState, useEffect, useContext, createContext } from 'react'
import { useParams } from 'react-router-dom'

import useUserTakeTask from '../api/useUserTakeTask'

const contextMenu = createContext({})

const MenuProvider = ({ children }) => {

    /**
     * Lägg till api-hooks här
     * Eventuellt göra en provider som håller all api-hooks
     */

    const { execute: executeTakeTask, isSuccess: takeTaskSuccess, isError: takeTaskError } = useUserTakeTask()

    useEffect(() => {
        if(!takeTaskSuccess) return

        console.log("Take task success", takeTaskSuccess)

    },[takeTaskSuccess])

    return (
        <contextMenu.Provider value={{ executeTakeTask }}>
            {children}
        </contextMenu.Provider>
    )
}


export const useMenu = () => useContext(contextMenu)

export default MenuProvider


