import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ConstructionIcon from '@mui/icons-material/Construction';

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

const resolvePermissionLabel = perm => 
perm === 'addTask' ? 'Lägga till uppgifter'
: perm === 'removeTask' ? 'Ta bort uppgifter'
: perm === 'generateInvite' ? 'Generera inbjudningskod'
: ""


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
                {permissions.length > 0 && 
                                <div>
                                    <p className="permissionTitle">Behörigheter: </p>
                                    <div className="permissionsContainer">

                                        {resolvePermissions(member._id, permissions)?.length !== 0 ? 
                                            <>
                                                {resolvePermissions(member._id, permissions)?.map(p => (
                                                    <div className="permission" key={p}>
                                                        <p className="permission--title">{resolvePermissionLabel(p)}</p>
                                                    </div>
                                                ))}
                                            </>
                                        : 
                                            <p className="noPermissionsText">{member.first_name} har inga speciella behörigheter</p>
                                        }
                                    </div>
                                </div>
                }
                <div 
                    className={clsx("buttons", {"border--top": permissions.length > 0})}
                >
                    <p className="iconText denyIcon deleteColor" onClick={() => showModalVariant('removeMember', member._id)} ><CancelIcon/> Ta bort från byggnad</p>
                    <p className="grantPermissionsButton iconText" onClick={() => showModalVariant('buildingPermissions', {member: member, permissions: resolvePermissions(member._id, permissions)})}><ConstructionIcon/>Redigera behörigheter</p>
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default MemberList;
