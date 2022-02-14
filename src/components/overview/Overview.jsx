import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './Overview.scss'

import StatsDisplay from './StatsDisplay';
import JoinBuildingForm from '../joinBuildingForm/JoinBuildingForm';
import BuildingsList from './BuildingsList';
import TaskListWithAccordion from '../Lists/TaskListWithAccordion/TaskListWithAccordion';
import TasksList from '../Lists/TasksList/TasksList';
import { useData } from '../../providers/DataProvider';



const Overview = () => {

    const { buildings, myTasks, isDataLoading, showModalVariant } = useData()

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

              <h2 className="overviewSubTitle">Dina byggnader</h2>
              <BuildingsList buildings={buildings} variant="list--clean" />
              <button className="createBuildingButton" onClick={() => showModalVariant('createBuilding')} > <AddCircleIcon/> Skapa ny byggnad</button>

              <JoinBuildingForm/>

              <h2 className="overviewSubTitle">Dina uppgifter</h2>
              <TaskListWithAccordion myTasks={myTasks} variant="list--clean" />

          </>
          }  
      </div>
  )
};

export default Overview;
