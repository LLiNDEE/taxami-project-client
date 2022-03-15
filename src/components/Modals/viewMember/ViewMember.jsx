import React from 'react'
import ConstructionIcon from '@mui/icons-material/Construction';

import './viewMember.scss'

import Flex from '../../core/Flex/Flex'
import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider'

const resolvePermissions = (member_id, permissions) => {
    if(!permissions) return []
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

const ViewMember = () => {

    const { modalData, showModalVariant } = useGlobal()

    const member = modalData.member
    const permissions = modalData.permissions

    return (
        <Modal
            variant="default"
            modalTitle={member.first_name}
            content={
                <>
                    <div className="permissionsContainer">
                        <h4 className="permissionsTitle">Behörigheter</h4>
                        {permissions.length !== 0 ?
                            <>
                                {resolvePermissions(member._id, permissions)?.map(p => (
                                    <p className="permission" key={p}>{resolvePermissionLabel(p)}</p>
                                ))}
                            </>
                        :
                        <p className="noPermissionsText">{member.first_name} har inga speciella behörigheter</p>
                        }
                    </div>
                    <Flex justify="center">
                        <button className="grantPermissionsButton iconText" onClick={() => showModalVariant('buildingPermissions', {member: member, permissions: resolvePermissions(member._id, permissions)})}><ConstructionIcon/> Redigera behörigheter</button>
                    </Flex>
                </>
            }
        />
    )
}

export default ViewMember