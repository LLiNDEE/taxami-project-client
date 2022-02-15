import React from 'react'

import Overview from '../components/overview/Overview'
import AdminOverview from '../components/adminOverview/AdminOverview'
import AdminProvider from '../providers/AdminProvider'
import { useGlobal } from '../providers/GlobalProvider'

const OverviewPage = () => {

    const { userRole } = useGlobal()
    
    return (
        <>
            {userRole === 'admin' ?
                <AdminProvider>
                    <AdminOverview/>
                </AdminProvider>
            : 
                <Overview/>
            }
        </>
    )
}

export default OverviewPage

