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

    const [filteredCustomers, setFilteredCustomers] = useState(undefined)

    useEffect(() => {
        if(customers)
        setFilteredCustomers(customers)
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
                        value=""
                    />
                    <StatsDisplay
                        title="Totalt antal arbetare"
                        value=""
                    />
                </div>

                <GenerateCode/>

                <CustomerSearch setFilteredCustomers={setFilteredCustomers} filteredCustomers={filteredCustomers}/>
                
                {filteredCustomers && <CustomerList customers={filteredCustomers} />}
            </div>
        : null}
    </div>
  )
}

export default AdminOverview