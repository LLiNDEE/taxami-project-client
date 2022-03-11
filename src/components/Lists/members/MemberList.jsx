import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import './MembersList.scss'

import List from '../List';
import { useGlobal } from '../../../providers/GlobalProvider'
import { useData } from '../../../providers/DataProvider';
import { clsx } from '../../../utils/utils'


const resolvePermissions = (member_id, permissions) => {
    let permissionArray
    permissions.forEach(p => {
        if(p.member_id === member_id){
            permissionArray =  p.permissions
        }
    })
    return permissionArray
}

const resolvePermissionLabel = perm => {
    if(perm === 'addTask') return "Lägga till uppgifter"
    if(perm === 'deleteTask') return "Ta bort uppgifter"
}


const MemberList = ({ members, tasks, permissions, ...props }) => {

    const { userID } = useGlobal()
    const { selectedBuilding, showModalVariant } = useData()

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
                <div>
                    <p className="permissionTitle">Behörigheter: </p>
                    <div className="permissionsContainer">
                        {resolvePermissions(member._id, permissions).map(p => (
                            <div className="permission" key={p}>
                                <p className="permission--title">{resolvePermissionLabel(p)}</p>
                                <p className="permission--button" onClick={() => alert(`Tar bort ${p} från användaren med id ${member._id}`)}><DeleteIcon/>Ta bort</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="buttons border--top">
                    <p className="iconText denyIcon deleteColor" onClick={() => showModalVariant('removeMember', member._id)} ><CancelIcon/> Ta bort från byggnad</p>
                    <p>Tilldela behörigheter</p>
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default MemberList;
