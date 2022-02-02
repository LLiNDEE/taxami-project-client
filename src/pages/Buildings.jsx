import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import StatsDisplay from '../components/overview/StatsDisplay';
import useBuildingTasks from '../api/useBuildingTasks';
import TasksList from '../components/Lists/TasksList/TasksList'
import TaskListWithAccordion from '../components/Lists/TaskListWithAccordion/TaskListWithAccordion';
import { useData } from '../providers/DataProvider'
import { useGlobal } from '../providers/GlobalProvider';
import { clsx } from '../utils/utils'

const Buildings = () => {

  const { id } = useParams()

  const { execute, isSuccess, isError, data } = useBuildingTasks()

  const { buildings, myTasks, setSelectedBuildingID } = useData()
  const { userID } = useGlobal()

  const [building, setBuilding] = useState(buildings.filter(b => b._id === id)[0])
  const [tasks, setTasks] = useState(undefined)
  const [filteredTasks, setFilteredTasks] = useState(undefined)

  const [tabIndex, setTabIndex] = useState("one")

  useEffect(() => {
    if(!building) return
    const data = {user_id: userID, building_id: building._id}
    execute(data)
  },[])

  useEffect(() => {
    if(!data) return

    setTasks(data.data.tasks)
    setFilteredTasks(myTasks.filter(t => t.building_id === building._id))

  },[data])

  useEffect(() => {
    if(!building) return

    setSelectedBuildingID(building._id)

  }, [building])

  return (
    <div className="buildingPage">
      {(!isError && tasks && filteredTasks) ? 
      <>
        <h2 className="buildingName">{building.building_name}</h2>

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
            <Tab value="two" label="Dina pågående uppgifter" />
            <Tab value="three" label="Dina avklarade uppgifter"/>
          </Tabs>
        </div>

        {tabIndex === "one" ? tasks.filter(t => t.status === 'idle').length < 1 ? <p className="noTasksText">Det finns inga tillgängliga uppgifter</p> : <TasksList myTasks={tasks.filter(t => t.status === 'idle')} variant="list--clean" withAssignIcon  /> : ""}
        {tabIndex === "two" ? filteredTasks.filter(t => t.status === 'inProgress').length < 1 ? <p className="noTasksText">Det finns inga pågående uppgifter</p> : <TaskListWithAccordion myTasks={tasks.filter(t => t.status === 'inProgress')}  variant="list--clean" withAcceptDenyIcons  /> : ""}
        {tabIndex === "three" ? filteredTasks.filter(t => t.status === 'completed').length < 1 ? <p className="noTasksText">Det finns inga avklarade uppgifter</p> : <TaskListWithAccordion myTasks={tasks.filter(t => t.status === 'completed')} variant="list--clean" withDenyIcon wihEye /> : ""}
        

      </> : null}

        {isError && <p>Byggnaden finns inte!</p>}

    </div>
  )
};

export default Buildings;
