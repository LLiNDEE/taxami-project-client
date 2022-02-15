import React, { createContext, useContext, useEffect, useState } from 'react'
import useAdminGenerateCode from '../api/useAdminGenerateCode'

import useAdminGetStats from '../api/useAdminGetStats'
import { useGlobal } from './GlobalProvider'

const adminContext = createContext({})

const AdminProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getStats, isSuccess: getStatsSuccess, data: statsData } = useAdminGetStats()
    const { execute: generateCode, isSuccess: generateCodeSuccess, data: generateCodeData } = useAdminGenerateCode()
    
    const [isDataLoading, setIsDataLoading] = useState(undefined)
    const [stats, setStats] = useState(undefined)
    const [subscriptionCode, setSubscriptionCode] = useState(undefined)

    useEffect(() => {
        getStats({user_id: userID})
        setIsDataLoading(true)
    }, [])

    useEffect(() => {
        if(!getStatsSuccess) return

        setIsDataLoading(false)

        setStats(statsData.data.stats)

    },[getStatsSuccess])

    useEffect(() => {
      if(!generateCodeSuccess) return

      setSubscriptionCode(generateCodeData.data.code)

    },[generateCodeSuccess])

  return (
    <adminContext.Provider value={{ stats, isDataLoading, subscriptionCode, generateCode }}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminProvider

export const useAdmin = () => useContext(adminContext)
