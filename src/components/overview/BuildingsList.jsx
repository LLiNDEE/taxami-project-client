import React from 'react';

import List from './List';

const BuildingsList = ({ buildings }) => {
    
    return (
        <List
            keys={['Namn', 'Uppgifter', 'Medlemmar']}
        >
            {buildings.map(building => (
            <div className="data" key={building._id}>
                <p className="dataItem">{building.building_name}</p>
                <p className="dataItem">{building.tasks.length}</p>
                <p className="dataItem">{building.members.length}</p>
            </div>
            )) }
      </List>
    )

};

export default BuildingsList;
