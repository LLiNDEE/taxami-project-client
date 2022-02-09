import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Chip from '@mui/material/Chip';

import StatsDisplay from '../components/overview/StatsDisplay';
import useBuildingTasks from '../api/useBuildingTasks';
import TasksList from '../components/Lists/TasksList/TasksList'
import TaskListWithAccordion from '../components/Lists/TaskListWithAccordion/TaskListWithAccordion';
import MemberList from '../components/Lists/members/MemberList';
import Flex from '../components/core/Flex/Flex'
import Input from '../components/core/Input/Input'
import useGetMembers from '../api/useGetMembers';
import useBuildingGenerateInvite from '../api/useBuildingGenerateInvite';
import { useData } from '../providers/DataProvider'
import { useGlobal } from '../providers/GlobalProvider';
import { clsx } from '../utils/utils'

const Buildings = () => {

  const { id } = useParams()

  const { execute, isSuccess, isError, data } = useBuildingTasks()
  const { execute: getMembers, isSuccess: membersSuccess, data: membersData, isError: membersError } = useGetMembers()
  const { execute: generateInvite, isSuccess: inviteSuccess, data: inviteCodeData, isError: inviteError } = useBuildingGenerateInvite()

  const { buildings, myTasks, setSelectedBuildingID, refreshPage, setRefreshPage, showModalVariant } = useData()
  const { userID } = useGlobal()

  const [building, setBuilding] = useState(buildings.filter(b => b._id === id)[0])
  const [tasks, setTasks] = useState(undefined)
  const [filteredTasks, setFilteredTasks] = useState(undefined)
  const [members, setMembers] = useState(undefined)

  const [isOwner, setIsOwner ] = useState(undefined)
  const [isInviteValid, setInviteValid] = useState(undefined)
  const [isInviteCopied, setInviteCopied] = useState(undefined)

  const [tabIndex, setTabIndex] = useState("one")


  useEffect(() => {
    if(!building) return
    const data = {user_id: userID, building_id: building._id}
    execute(data)
  },[])

  useEffect(() => {
    if(!refreshPage || !building) return

    const data = {user_id: userID, building_id: building._id}
    execute(data)
    getMembers({user_id: userID, building_id: building._id})

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

    setTasks(data.data.tasks)
    setFilteredTasks(myTasks.filter(t => t.building_id === building._id))

  },[data])

  useEffect(() => {
    if(!building) return

    setSelectedBuildingID(building._id)

  }, [building])

  useEffect(() => {
    if(!isOwner) return

    getMembers({user_id: userID, building_id: building._id})

  },[isOwner])

  useEffect(() => {
    if(!membersSuccess) return

    setMembers(membersData.data.members)

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

  return (
    <div className="buildingPage">
      {(!isError && tasks && filteredTasks) ? 
      <>
        <h2 className="buildingName">{building.building_name}</h2>  
        {!isOwner && 
          <Flex justify="right">
            <button className="leaveBuildingButton" onClick={() => showModalVariant('leaveBuilding')}>Lämna byggnad</button>
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

        {tabIndex === "one" ? tasks.filter(t => t.status === 'idle').length < 1 ? <p className="noTasksText">Det finns inga tillgängliga uppgifter</p> : <TaskListWithAccordion myTasks={tasks.filter(t => t.status === 'idle')} variant="list--clean" withAssignIcon /> : ""}
        {tabIndex === "two" ? filteredTasks.filter(t => t.status === 'inProgress').length < 1 ? <p className="noTasksText">Det finns inga pågående uppgifter</p> : <TaskListWithAccordion members={members} myTasks={tasks.filter(t => t.status === 'inProgress')}  variant="list--clean" withAcceptDenyIcons  /> : ""}
        {tabIndex === "three" ? filteredTasks.filter(t => t.status === 'completed').length < 1 ? <p className="noTasksText">Det finns inga avklarade uppgifter</p> : <TaskListWithAccordion myTasks={tasks.filter(t => t.status === 'completed')} variant="list--clean" withDenyIcon wihEye /> : ""}
        
        {isOwner && <Flex justify="left"> <button className="addTaskButton" onClick={() => showModalVariant('addTask')} ><AddCircleIcon className="addIcon"/> Lägg till uppgift</button></Flex>}

        {isOwner && members && 
          <div className="membersList">
          <h2>Medlemmar</h2>
          <MemberList members={members} tasks={tasks} />
          </div>
        }

        {isOwner &&
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
