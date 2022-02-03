import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './MembersList.scss'

import List from '../List';
import { useGlobal } from '../../../providers/GlobalProvider'
import { useData } from '../../../providers/DataProvider';
import { clsx } from '../../../utils/utils'




const MemberList = ({ members, tasks, ...props }) => {

    const { userID } = useGlobal()
    const { selectedBuildingID } = useData()


    return (
        <List
        keys={['Förnamn', 'Efternamn', 'Antal pågående uppgifter', 'Antal avklarade uppgifter']}
        {...props}
        >
        {members.map(member => (
        <Accordion key={member._id}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div className="dataAccordion">
                    <p className="dataItem ">{member.first_name}</p>
                    <p className="dataItem ">{member.last_name}</p>
                    <p className="dataItem">{tasks.filter(t => member.tasks.includes(t._id)).length}</p>
                    <p className="dataItem">{tasks.filter(t => member.completed_tasks.includes(t._id)).length}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className="memberDetails">
                <div className="buttons">
                    <p className="iconText denyIcon" ><CancelIcon/> Ta bort från byggnad</p>
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default MemberList;
