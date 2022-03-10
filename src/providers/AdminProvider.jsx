import React, { createContext, useContext, useEffect, useState } from 'react'
import useAdminGenerateCode from '../api/useAdminGenerateCode'

import useAdminGetStats from '../api/useAdminGetStats'
import useAdminGetCustomers from '../api/useAdminGetCustomers'
import useAdminLockAccount from '../api/useAdminLockAccount'
import useAdminUnlockAccount from '../api/useAdminUnlockAccount'
import Snackbar from '../components/Snackbar/Snackbar'
import { useGlobal } from './GlobalProvider'

const adminContext = createContext({})

const AdminProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getStats, isSuccess: getStatsSuccess, data: statsData } = useAdminGetStats()
    const { execute: generateCode, isSuccess: generateCodeSuccess, data: generateCodeData } = useAdminGenerateCode()
    const { execute: getCustomers, isSuccess: customersSuccess, data: customersData } = useAdminGetCustomers()

    const { execute: lockAccount, isSuccess: lockAccountSuccess, data: lockAccountData } = useAdminLockAccount()
    const { execute: unlockAccount, isSuccess: unlockAccountSuccess, data: unlockAccountData } = useAdminUnlockAccount()
    
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

        setStats(statsData.data)

    },[getStatsSuccess])

    useEffect(() => {
      if(!generateCodeSuccess) return

      setSubscriptionCode(generateCodeData.data.code)

    },[generateCodeSuccess])

    useEffect(() => {

      if(!customersSuccess) return

      setCustomers(customersData.data.customers)

    }, [customersSuccess])

    useEffect(() => {

      if(!lockAccountSuccess && !unlockAccountSuccess) return

      getCustomers({user_id: userID})

    },[lockAccountSuccess, unlockAccountSuccess])

  return (
    <adminContext.Provider value={{ stats, isDataLoading, subscriptionCode, generateCode, customers, lockAccount, unlockAccount }}>
        {children}
        {lockAccountSuccess && <Snackbar initial={true} message="Kontot är nu låst" />}
        {unlockAccountSuccess && <Snackbar initial={true} message="Kontot är nu upplåst" />}
    </adminContext.Provider>
  )
}

export default AdminProvider

export const useAdmin = () => useContext(adminContext)
