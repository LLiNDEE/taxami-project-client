import React, { createContext, useContext, useEffect, useState } from 'react'

import useAdminGetStats from '../api/useAdminGetStats'
import { useGlobal } from './GlobalProvider'

const adminContext = createContext({})

const AdminProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getStats, isSuccess: getStatsSuccess, data: statsData } = useAdminGetStats()
    
    const [isDataLoading, setIsDataLoading] = useState(undefined)
    const [stats, setStats] = useState(undefined)

    useEffect(() => {
        getStats({user_id: userID})
        setIsDataLoading(true)
    }, [])

    useEffect(() => {
        if(!getStatsSuccess) return

        setIsDataLoading(false)

        setStats(statsData.data.stats)

    },[getStatsSuccess])

  return (
    <adminContext.Provider value={{ stats, isDataLoading }}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminProvider

export const useAdmin = () => useContext(adminContext)
