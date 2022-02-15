import React from 'react'

import '../overview/Overview.scss'

import { useAdmin } from '../../providers/AdminProvider'

import StatsDisplay from '../overview/StatsDisplay'

const AdminOverview = () => {

    const { isDataLoading, stats } = useAdmin()

  return (
    <div className="overview">
        <h2 className="overviewTitle">Översikt</h2>
        {!isDataLoading ? 
            <div className="stats">
                <StatsDisplay
                    title="Totalt antal byggnader" 
                    value={stats}
                />
                <StatsDisplay
                    title="Totalt antal kunder"
                    value=""
                />
                <StatsDisplay
                    title="Totalt antal arbetare"
                    value=""
                />
            </div>
        : null}
    </div>
  )
}

export default AdminOverview