import React, { useState, useEffect } from 'react'

import '../overview/Overview.scss'
import './AdminOverview.scss'

import { useAdmin } from '../../providers/AdminProvider'

import StatsDisplay from '../overview/StatsDisplay'
import GenerateCode from './generateCode/GenerateCode'
import CustomerList from '../Lists/CustomerList/CustomerList'
import CustomerSearch from './customerSearch/CustomerSearch'

const AdminOverview = () => {

    const { isDataLoading, stats, customers } = useAdmin()

    const [allCustomers, setAllCustomers] = useState(undefined)

    const [filteredCustomers, setFilteredCustomers] = useState(undefined)

    useEffect(() => {
        if(customers)
        setAllCustomers(customers)
    },[customers])

  return (
    <div className="overview">
        <h2 className="overviewTitle">Översikt</h2>
        {!isDataLoading ? 
            <div className="adminOverviewContainer">
                <div className="stats">
                    <StatsDisplay
                        title="Totalt antal byggnader" 
                        value={stats}
                    />
                    <StatsDisplay
                        title="Totalt antal kunder"
                        value={allCustomers.length}
                    />
                    <StatsDisplay
                        title="Totalt antal arbetare"
                        value=""
                    />
                </div>

                <GenerateCode/>

                <CustomerSearch allCustomers={allCustomers} filteredCustomers={filteredCustomers} setFilteredCustomers={setFilteredCustomers} />
                
                {allCustomers && <CustomerList customers={filteredCustomers ?? allCustomers} />}
            </div>
        : null}
    </div>
  )
}

export default AdminOverview