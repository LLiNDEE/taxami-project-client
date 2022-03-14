import React, { useEffect, useState } from 'react'

import './TransferPermission.scss'

import Flex from '../../core/Flex/Flex'
import TransferList from '../TransferList'
import { useData } from '../../../providers/DataProvider'
import { useGlobal } from '../../../providers/GlobalProvider'

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
    const permissionArray = []
    permissions.forEach(p => {
        permissionArray.push(resolvePermission(p))
    })
    return permissionArray
}

const getFormatLabels = permissions => {
    const permissionArray = []
    permissions.forEach(p => {
        permissionArray.push(resolvePermissionLabel(p))
    })
    return permissionArray
}

const TransferPermissions = ({ hideModal, member_id, permissions }) => {

    const { userID } = useGlobal()
    const { addPermission, selectedBuilding } = useData()

    // const [right, setRight] = useState(initialRight) 
    const [right, setRight] = useState(allPermissions.filter(p => !permissions.includes(resolvePermission(p))))
    const [left, setLeft] = useState(getFormatLabels(permissions))

    const handleSubmit = () => {
        const formattedLeft = formatPermissions(left)
        const formattedRight = formatPermissions(right)
        const permissionObject = {user_id: userID, member_id: member_id, permissions: formattedLeft, building_id: selectedBuilding.building_id}
        addPermission(permissionObject)
        hideModal()
    }

  return (
      <>
        <TransferList
            leftItems={left}
            rightItems={right}
            setRightItems={setRight}
            setLeftItems={setLeft}
            leftTitle={<p className="title">Kan göra</p>}
            rightTitle={<p className="title">Kan INTE göra</p>}
        />
        <Flex justify="center">
            <button className="confirmPermissionsButton" onClick={handleSubmit} >Spara behörigheter</button>
        </Flex>
      </>
  )
}

export default TransferPermissions