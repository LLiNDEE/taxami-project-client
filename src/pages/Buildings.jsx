import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import StatsDisplay from '../components/overview/StatsDisplay';
import useBuildingTasks from '../api/useBuildingTasks';
import TasksList from '../components/overview/TasksList'
import { useData } from '../providers/DataProvider'
import { useGlobal } from '../providers/GlobalProvider';
import { clsx } from '../utils/utils'

const Buildings = () => {

  const { id } = useParams()

  const { execute, isSuccess, isError, data } = useBuildingTasks()

  const { buildings } = useData()
  const { userID } = useGlobal()

  const [building, setBuilding] = useState(buildings.filter(b => b._id === id)[0])
  const [tasks, setTasks] = useState(undefined)

  const [tabIndex, setTabIndex] = useState("one")

  useEffect(() => {
    if(!building) return
    const data = {user_id: userID, building_id: building._id}
    execute(data)
  },[])

  useEffect(() => {
    if(!data) return

    setTasks(data.data.tasks)

  },[data])

  return (
    <div className="buildingPage">
      Lista av byggnader....
      {tasks ? 
      <>
        <p>{JSON.stringify(building)}</p>
        <h2 className="buildingName">{building.building_name}</h2>

        <div className="stats">
          <StatsDisplay
          title="Antal uppgifter"
          value={tasks.length}
          />
          <StatsDisplay
          title="Antal avklarade uppgifter"
          value={tasks.filter(t => t.status !== 'completed').length}
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
            <Tab value="two" label="Pågående uppgifter" />
            <Tab value="three" label="Avklarade uppgifter"/>
          </Tabs>
        </div>

        {tabIndex === "one" ? tasks.filter(t => t.status === 'idle').length < 1 ? <p className="noTasksText">Det finns inga tillgängliga uppgifter</p> : <TasksList myTasks={tasks.filter(t => t.status === 'idle')} /> : ""}
        {tabIndex === "two" ? tasks.filter(t => t.status === 'inProgress').length < 1 ? "Det finns inga pågående uppgifter" : <TasksList myTasks={tasks.filter(t => t.status === 'inProgress')} /> : ""}
        {tabIndex === "three" ? tasks.filter(t => t.status === 'completed').length < 1 ? "Det finns inga avklarade uppgifter" : <TasksList myTasks={tasks.filter(t => t.status === 'completed')} /> : ""}
        
      </> : "Loading??"}
    </div>
  )
};

export default Buildings;
