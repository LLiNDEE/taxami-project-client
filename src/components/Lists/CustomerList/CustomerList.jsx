import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import './CustomerList.scss'

import List from '../List';
import { useAdmin } from '../../../providers/AdminProvider' 
import { useGlobal } from '../../../providers/GlobalProvider'
import { clsx } from '../../../utils/utils'

const resolveStatus = status => 
status === 'active' ? "Aktiv"
: "Låst"

const CustomerList = ({ customers, ...props }) => {

    const { lockAccount, unlockAccount } = useAdmin()
    const { userID } = useGlobal()

    useEffect(() => {
        console.log("CUSTOMERS UPDATED FROM CUSTOMERLIST")
    },[customers])

    return (
        <List
        keys={['Förnamn', 'Efternamn', 'Byggnader', 'Status']}
        {...props}
        >
        {customers.length > 0 && customers.map(customer => (
        <Accordion key={customer._id}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div className="dataAccordion">
                    <p className="dataItem ">{customer.first_name}</p>
                    <p className="dataItem  ">{customer.last_name}</p>
                    <p className="dataItem ">
                        {customer.buildings.length}
                    </p>
                    <p className="dataItem">
                        <span 
                            className={clsx({
                            status: true,
                            [`customer-status--${customer.status}`]: true
                            })}
                            >
                             {resolveStatus(customer.status)}
                        </span>
                       
                    </p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="buttons">
                    { customer.status === 'active' && <p className="iconText lockAccount" onClick={() => lockAccount({user_id: userID, customer_id: customer._id})} ><LockIcon/> Lås konto</p>}
                    { customer.status === 'locked' && <p className="iconText lockAccount" onClick={() => unlockAccount({user_id: userID, customer_id: customer._id})}> <LockOpenIcon/> Lås upp konto</p> }
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default CustomerList;
