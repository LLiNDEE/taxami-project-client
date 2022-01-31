import React from 'react';
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import List from './List';

const BuildingsList = ({ buildings }) => {
    
    return (
        <List
            keys={['Namn', 'Uppgifter', 'Medlemmar']}
        >
            {buildings.map(building => (
            <div className="data" key={building._id}>
                <p className="dataItem">{building.building_name}</p>
                <p className="dataItem center">{building.tasks.length}</p>
                <p className="dataItem center">{building.members.length}</p>
                <p className="viewButton"><Link to={`/byggnad/${building._id}`}><RemoveRedEyeIcon/></Link></p>
            </div>
            )) }
            
      </List>
    )

};

export default BuildingsList;
