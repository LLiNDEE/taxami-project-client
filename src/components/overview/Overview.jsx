import React from 'react';

import './Overview.scss'

import StatsDisplay from './StatsDisplay';
import { useGlobal } from '../../providers/GlobalProvider'

const Overview = () => {

    const { buildings, tasks } = useGlobal()

  return (
    <div className="overview">
      <h2 className="overviewTitle">Översikt</h2>
        <div className="stats">
            <StatsDisplay 
                title="Antal byggnader" 
                value={buildings.length}
                buttonText="Visa byggnader"
                useLink="/byggnader"
            />
            <StatsDisplay 
                title="Antal pågående uppgifter" 
                value={tasks.filter(t => t.status != "completed").length}
                buttonText="Visa pågående uppgifter"
            />
            <StatsDisplay 
                title="Antal avklarade uppgifter" 
                value={tasks.filter(t => t.status === "completed").length}
                buttonText="Visa avklarade uppgifter"
            />
        </div>
    </div>
  )
};

export default Overview;
