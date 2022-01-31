import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import StatsDisplay from '../components/overview/StatsDisplay';
import useBuildingTasks from '../api/useBuildingTasks';
import { useData } from '../providers/DataProvider'
import { useGlobal } from '../providers/GlobalProvider';

const Buildings = () => {

  const { id } = useParams()

  const { execute, isSuccess, isError, data } = useBuildingTasks()

  const { buildings } = useData()
  const { userID } = useGlobal()

  const [building, setBuilding] = useState(buildings.filter(b => b._id === id)[0])
  const [tasks, setTasks] = useState(undefined)

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
      <Tabs id="simple-tabpanel" aria-label="basic tabs example">
        <Tab label="Tillgängliga uppgifter"/>
        <Tab label="Avklarade uppgifter"/>
      </Tabs>
      <p>{JSON.stringify(tasks) ?? ""}</p>
    </div>
  )
};

export default Buildings;
