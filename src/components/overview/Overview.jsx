import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import './Overview.scss'

import StatsDisplay from './StatsDisplay';
import BuildingsList from './BuildingsList';
import TasksList from './TasksList';
import { useData } from '../../providers/DataProvider';



const Overview = () => {

    const { buildings, myTasks, isDataLoading } = useData()

  return (
    <div className="overview">
      <h2 className="overviewTitle">Översikt</h2>
        
          {isDataLoading ? 
            <CircularProgress className="loadingSpinner" />
          :
          <>
            <div className="stats">
              <StatsDisplay 
                    title="Antal byggnader" 
                    value={buildings.length}
                    buttonText="Visa byggnader"
                    useLink="/byggnader"
                />
                <StatsDisplay 
                    title="Antal pågående uppgifter" 
                    value={myTasks.filter(t => t.status != "completed").length}
                    buttonText="Visa pågående uppgifter"
                />
                <StatsDisplay 
                    title="Antal avklarade uppgifter" 
                    value={myTasks.filter(t => t.status === "completed").length}
                    buttonText="Visa avklarade uppgifter"
                />
              </div>

              <BuildingsList buildings={buildings} />
              <TasksList myTasks={myTasks} />

          </>
          }  
      </div>
  )
};

export default Overview;
