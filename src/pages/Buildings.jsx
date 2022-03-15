import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';

import StatsDisplay from '../components/overview/StatsDisplay';
import useBuildingTasks from '../api/useBuildingTasks';
import TaskListWithAccordion from '../components/Lists/TaskListWithAccordion/TaskListWithAccordion';
import MemberList from '../components/Lists/members/MemberList';
import Flex from '../components/core/Flex/Flex'
import Input from '../components/core/Input/Input'
import TaskCardList from '../components/TaskCardList/TaskCardList';
import MemberCardList from '../components/MemberCardList/MemberCardList';
import useGetMembers from '../api/useGetMembers';
import useBuildingGenerateInvite from '../api/useBuildingGenerateInvite';
import useBuildingGetPermissions from '../api/useBuildingGetPermissions';
import { useData } from '../providers/DataProvider'
import { useGlobal } from '../providers/GlobalProvider';
import useBreakpoint from '../hooks/useBreakpoint';
import { clsx } from '../utils/utils'

const filterPermissions = (id, permissions) => permissions ? permissions.filter(p => p.member_id === id) : []

const Buildings = () => {

  const { id } = useParams()

  const { sm } = useBreakpoint()

  const { execute, isSuccess, isError, data } = useBuildingTasks()
  const { execute: getMembers, isSuccess: membersSuccess, data: membersData, isError: membersError } = useGetMembers()
  const { execute: generateInvite, isSuccess: inviteSuccess, data: inviteCodeData, isError: inviteError } = useBuildingGenerateInvite()
  const { execute: getPermissions, isSuccess: getPermissionSuccess, isError: getPermissionsError, data: getPermissionsData } = useBuildingGetPermissions()

  const { buildings, myTasks, setSelectedBuilding, refreshPage, setRefreshPage, showModalVariant } = useData()
  const { userID, userRole } = useGlobal()

  const [building, setBuilding] = useState(buildings.filter(b => b._id === id)[0])
  const [tasks, setTasks] = useState(undefined)
  const [filteredTasks, setFilteredTasks] = useState(undefined)
  const [members, setMembers] = useState(undefined)

  const [permissions, setPermissions] = useState(undefined)

  const [isOwner, setIsOwner ] = useState(undefined)
  const [isInviteValid, setInviteValid] = useState(undefined)
  const [isInviteCopied, setInviteCopied] = useState(undefined)

  const [tabIndex, setTabIndex] = useState("one")


  const userPermissions = useMemo(() => filterPermissions(userID, permissions), [permissions])


  useEffect(() => {
    console.log("USER PERMISSIONS --->", userPermissions)
  },[userPermissions])

  useEffect(() => {
    if(!building) return
    const data = {user_id: userID, building_id: building._id}
    execute(data)
  },[])

  useEffect(() => {
    if(!refreshPage || !building) return

    const data = {user_id: userID, building_id: building._id}
    execute(data)
    if(userRole === 'customer') {
      getMembers({user_id: userID, building_id: building._id})
      getPermissions({user_id: userID, building_id: building._id})
    }

    setRefreshPage(false)

  },[refreshPage])

  useEffect(() => {
    if(!data) return

    if(userID === building.user_id){
      setIsOwner(true)
      setTasks(data.data.tasks)
      setFilteredTasks(data.data.tasks)
      return
    }

    console.log("Taaaasks ---->", data.data.tasks)

    setTasks(data.data.tasks)
    // setFilteredTasks(myTasks.filter(t => t.building_id === building._id))
    setFilteredTasks(data.data.tasks.filter(t => t.building_id === building._id))

  },[data])

  useEffect(() => {
    if(!building) return

    setSelectedBuilding(v => ({...v, building_id: building._id, building_name: building.building_name}))

    if(building?.permissions){
      setPermissions(building.permissions)
    }

  }, [building])

  useEffect(() => {
    if(!isOwner) return

    getMembers({user_id: userID, building_id: building._id})

  },[isOwner])

  useEffect(() => {
    if(!membersSuccess) return

    setMembers(membersData.data.members)
    console.log("MEMBERS UPDATED")

  },[membersSuccess])

  useEffect(() => {
    if(!inviteSuccess) return

    setInviteValid(true)

  },[inviteSuccess])

  useEffect(() => {
    if(!isInviteCopied) return

    setTimeout(() => {
        setInviteCopied(false)
    }, 1000)

  },[isInviteCopied])

  useEffect(() => {
    if(!getPermissionSuccess) return
    
    setPermissions(getPermissionsData.data.permissions)

  },[getPermissionSuccess])

  return (
    <div className="buildingPage">
      {(!isError && tasks && filteredTasks) ? 
      <>
        <h2 className="buildingName">{building.building_name}</h2>  
        {!isOwner && 
          <Flex justify="right">
            <button className="leaveBuildingButton" onClick={() => showModalVariant('leaveBuilding')}>Lämna byggnad <LogoutIcon className="logoutIcon"/></button>
          </Flex>
        }

        <div className="stats">
          <StatsDisplay
          title="Antal tillgängliga uppgifter"
          value={tasks.filter(t => t.status === 'idle').length}
          />
          <StatsDisplay
          title="Antal avklarade uppgifter"
          value={tasks.filter(t => t.status === 'completed').length}
          />
          <StatsDisplay
          title="Antal medlemmar"
          value={building.members.length}
          />
        </div>

        <div className="tabs">
          <Tabs 
            value={tabIndex}
            onChange={(event, newValue) => setTabIndex(newValue)} 
          >
            <Tab value="one" label="Tillgängliga uppgifter" />
            <Tab value="two" label={userID === building.user_id ? "Pågående uppgifter" : "Dina pågående uppgifter"} />
            <Tab value="three" label={userID === building.user_id ? "Avklarade uppgifter" : "Dina avklarade uppgifter"}/>
          </Tabs>
        </div>

        {tabIndex === "one" && !sm ? tasks.filter(t => t.status === 'idle').length < 1 ? <p className="noTasksText">Det finns inga tillgängliga uppgifter</p> : <TaskListWithAccordion permissions={userPermissions[0]} myTasks={tasks.filter(t => t.status === 'idle')} variant="list--clean" withAssignIcon /> : ""}
        {tabIndex === "two" && !sm ? filteredTasks.filter(t => t.status === 'inProgress').length < 1 ? <p className="noTasksText">Det finns inga pågående uppgifter</p> : <TaskListWithAccordion members={members} myTasks={tasks.filter(t => t.status === 'inProgress')}  variant="list--clean" withAcceptDenyIcons  /> : ""}
        {tabIndex === "three" && !sm ? filteredTasks.filter(t => t.status === 'completed').length < 1 ? <p className="noTasksText">Det finns inga avklarade uppgifter</p> : <TaskListWithAccordion myTasks={tasks.filter(t => t.status === 'completed')} variant="list--clean" withDenyIcon wihEye /> : ""}
        
        {tabIndex === "one" && sm ? tasks.filter(t => t.status === 'idle').length < 1 ? <p className="noTasksText">Det finns inga tillgängliga uppgifter</p> : <TaskCardList tasks={tasks.filter(t => t.status === 'idle')} /> : ""}
        {tabIndex === "two" && sm ? filteredTasks.filter(t => t.status === 'inProgress').length < 1 ? <p className="noTasksText">Det finns inga pågående uppgifter</p> : <TaskCardList tasks={tasks.filter(t => t.status === 'inProgress')} /> : ""}
        {tabIndex === "three" && sm ? filteredTasks.filter(t => t.status === 'completed').length < 1 ? <p className="noTasksText">Det finns inga avklarade uppgifter</p> : <TaskCardList tasks={tasks.filter(t => t.status === 'completed')} /> : ""}


        {(isOwner || userPermissions[0]?.permissions?.includes('addTask')) && !sm && <Flex justify="left"> <button className="addTaskButton" onClick={() => showModalVariant('addTask')} ><AddCircleIcon className="addIcon"/> Lägg till uppgift</button></Flex>}

        {isOwner && members && !sm && 
          <div className="membersList">
          <h2>Medlemmar</h2>
          <MemberList members={members} tasks={tasks} permissions={permissions} />
          {members.length < 1 && <p className="noTasksText">Det finns inga medlemmar</p>}
          </div>
        }

        {isOwner && members && sm && 
          <>
            <h3>Medlemmar</h3>
            <MemberCardList members={members} tasks={tasks} permissions={permissions} />
          </>
        }

        {(isOwner || userPermissions[0]?.permissions?.includes('generateInvite')) &&
        <>
          <div className="generateInviteContainer">
            <Input label="Inbjudningskod" id="outlined-read-only-input" value={isInviteValid ? inviteCodeData?.data.invite_code : "Inbjudningskod"} readOnly/>
            { !isInviteValid && <p className="generateCodeButton" onClick={() => generateInvite({user_id: userID, building_id: building._id}) } ><AutorenewIcon/></p>}
            {isInviteValid && <p className="copyCodeButton" onClick={() => (navigator.clipboard.writeText(inviteCodeData.data.invite_code), setInviteCopied(true))}><ContentCopyIcon/></p>}
            {isInviteValid &&  <p className="generateCodeButton" onClick={() => generateInvite({user_id: userID, building_id: building._id}) } ><AutorenewIcon/></p>}
          </div> 
          <div className="copiedChipContainer">
            {isInviteCopied && <Chip label="Kopierad" color="success"/>}
          </div>
          </>
        }

      </> : null}

        {isError && <p>Byggnaden finns inte!</p>}

    </div>
  )
};

export default Buildings;
