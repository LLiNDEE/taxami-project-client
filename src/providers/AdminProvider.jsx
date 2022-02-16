import React, { createContext, useContext, useEffect, useState } from 'react'
import useAdminGenerateCode from '../api/useAdminGenerateCode'

import useAdminGetStats from '../api/useAdminGetStats'
import useAdminGetCustomers from '../api/useAdminGetCustomers'
import { useGlobal } from './GlobalProvider'

const adminContext = createContext({})

const AdminProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getStats, isSuccess: getStatsSuccess, data: statsData } = useAdminGetStats()
    const { execute: generateCode, isSuccess: generateCodeSuccess, data: generateCodeData } = useAdminGenerateCode()
    const { execute: getCustomers, isSuccess: customersSuccess, data: customersData } = useAdminGetCustomers()
    
    const [isDataLoading, setIsDataLoading] = useState(undefined)
    const [stats, setStats] = useState(undefined)
    const [subscriptionCode, setSubscriptionCode] = useState(undefined)
    const [customers, setCustomers] = useState(undefined)

    useEffect(() => {
        getStats({user_id: userID})
        getCustomers({user_id: userID})
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

    useEffect(() => {

      if(!customersSuccess) return

      setCustomers(customersData.data.customers)

    }, [customersSuccess])

  return (
    <adminContext.Provider value={{ stats, isDataLoading, subscriptionCode, generateCode, customers }}>
        {children}
    </adminContext.Provider>
  )
}

export default AdminProvider

export const useAdmin = () => useContext(adminContext)
