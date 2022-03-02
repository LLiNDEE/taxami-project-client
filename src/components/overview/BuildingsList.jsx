import React from 'react';
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import List from '../Lists/List';

const BuildingsList = ({ buildings, ...props }) => {
    
    return (
        <List
            keys={['Namn', 'Uppgifter', 'Medlemmar']}
            {...props}
        >
            {buildings.map(building => (
            <div className="data" key={building._id}>
                <p className="dataItem">{building.building_name}</p>
                <p className="dataItem center">{building.tasks.length}</p>
                <p className="dataItem center">{building.members.length}</p>
                {building.status === "active" && 
                    <p className="viewButton">
                        <Link to={`/byggnad/${building._id}`}>
                            <Tooltip title="Visa mer">
                                <IconButton>
                                    <RemoveRedEyeIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </p>
                }
                {building.status === "locked" && 
                    <p className="viewButton">
                        <Tooltip title="Den här byggnaden är låst">
                            <IconButton>
                                <LockIcon/>
                            </IconButton>
                        </Tooltip>
                    </p>
                }
            </div>
            )) }
            
      </List>
    )

};

export default BuildingsList;
