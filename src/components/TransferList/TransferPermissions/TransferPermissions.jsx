import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './TransferPermission.scss'

import Flex from '../../core/Flex/Flex'
import TransferList from '../TransferList'
import { useData } from '../../../providers/DataProvider'
import { useGlobal } from '../../../providers/GlobalProvider'
import useBreakpoint from '../../../hooks/useBreakpoint'
import useDebounce from '../../../hooks/useDebounce';
import { useMenu } from '../../../providers/MenuProvider';

const allPermissions = ["Lägg till uppgifter", "Ta bort uppgifter", "Generera inbjudningskod"]

const resolvePermission = perm => 
perm === 'Lägg till uppgifter' ? "addTask"
: perm === 'Ta bort uppgifter' ? "removeTask"
: perm === 'Generera inbjudningskod' ? "generateInvite"
: ""

const resolvePermissionLabel = perm => 
perm === 'addTask' ? "Lägg till uppgifter"
: perm === 'removeTask' ? 'Ta bort uppgifter'
: perm === 'generateInvite' ? 'Generera inbjudningskod'
: ""

const formatPermissions = permissions => {

    if(!permissions) return []

    const permissionArray = []
    permissions.forEach(p => {
        permissionArray.push(resolvePermission(p))
    })
    return permissionArray
}

const getFormatLabels = permissions => {

    if(!permissions) return []

    const permissionArray = []
    permissions.forEach(p => {
        permissionArray.push(resolvePermissionLabel(p))
    })
    return permissionArray
}

const TransferPermissions = ({ hideModal, member_id, permissions }) => {

    const { sm } = useBreakpoint()

    const { userID, setSelectedUserPermissions } = useGlobal()
    const { addPermission, selectedBuilding } = useData()

    const [checked, setChecked] = useState(permissions)

    const [right, setRight] = useState(permissions ? allPermissions.filter(p => !permissions.includes(resolvePermission(p))) : allPermissions)
    const [left, setLeft] = useState(getFormatLabels(permissions))

    const handleSubmit = () => {
        const formattedLeft = formatPermissions(left)
        const formattedRight = formatPermissions(right)
        const permissionObject = {user_id: userID, member_id: member_id, permissions: formattedLeft, building_id: selectedBuilding.building_id}
        addPermission(permissionObject)
        hideModal()
    }

    const handleChecked = e =>{
        setChecked(v => e.target.checked ? [...v, e.target.id] : v.filter(c => c !== e.target.id))
    }

    const debouncedChecked = useDebounce(checked, 200)

    useEffect(() => {
        if(!debouncedChecked) return

        setSelectedUserPermissions({user_id: userID, member_id: member_id, building_id: selectedBuilding.building_id, permissions: debouncedChecked})

    },[debouncedChecked])

  return (
      <>
        {!sm && 
            <TransferList
                leftItems={left}
                rightItems={right}
                setRightItems={setRight}
                setLeftItems={setLeft}
                leftTitle={<p className="title">Kan göra</p>}
                rightTitle={<p className="title">Kan INTE göra</p>}
            />
        }
        {sm && 
            <>
                <div>
                    <FormControlLabel 
                        label="Lägga till uppgifter" 
                        control={<Checkbox checked={!!checked.includes('addTask')} id="addTask" onChange={handleChecked} />} 
                    />
                </div>
                <div>
                    <FormControlLabel 
                        label="Ta bort uppgifter" 
                        control={<Checkbox checked={!!checked.includes('removeTask')} id="removeTask" onChange={handleChecked} />} 
                    />
                </div>
                <div>
                    <FormControlLabel 
                        label="Generera inbjudningskod" 
                        control={<Checkbox checked={!!checked.includes('generateInvite')} id="generateInvite" onChange={handleChecked} />} 
                    />
                </div>
            </>
        }
        {!sm && 
            <Flex justify="center">
                <button className="confirmPermissionsButton" onClick={handleSubmit} >Spara behörigheter</button>
            </Flex>
        }
      </>
  )
}

export default TransferPermissions