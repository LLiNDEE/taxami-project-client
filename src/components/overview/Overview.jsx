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
import { useGlobal } from '../../providers/GlobalProvider';
import { clsx } from '../../utils/utils';

import BuildingCardList from './buildingCardList/BuildingCardList';
import TaskCardList from './TaskCardList/TaskCardList';
import useBreakpoint from '../../hooks/useBreakpoint';


const Overview = () => {

    const { userRole } = useGlobal()
    const { buildings, myTasks, isDataLoading, showModalVariant } = useData()

    const { sm } = useBreakpoint()
    console.log("SM --> ", sm)

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
                    // buttonText="Visa byggnader"
                    // useLink="/byggnader"
                />
                <StatsDisplay 
                    title="Antal pågående uppgifter" 
                    value={myTasks.filter(t => t.status != "completed").length}
                    // buttonText="Visa pågående uppgifter"
                />
                <StatsDisplay 
                    title="Antal avklarade uppgifter" 
                    value={myTasks.filter(t => t.status === "completed").length}
                    // buttonText="Visa avklarade uppgifter"
                />
              </div>

              <h2 
                className={clsx(
                  "overviewSubTitle", 
                  {['overviewSubTitle--sm']: sm}
                )}
              >Dina byggnader</h2>
              {!sm &&  <BuildingsList buildings={buildings} variant="list--clean" />}
              {sm && <BuildingCardList buildings={buildings} />}

              { userRole === 'customer' && <button className="createBuildingButton" onClick={() => showModalVariant('createBuilding')} > <AddCircleIcon/> Skapa ny byggnad</button>}

              <JoinBuildingForm/>

              <h2 className={clsx("overviewSubTitle", {['overviewSubTitle--sm']: sm})}>Dina uppgifter</h2>

              {!sm && <TaskListWithAccordion myTasks={myTasks} variant="list--clean" />}
              {sm && <TaskCardList tasks={myTasks} />}

          </>
          }  
      </div>
  )
};

export default Overview;
