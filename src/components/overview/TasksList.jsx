import React from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import List from './List';

const PRIORITIES = {
    low: 'low',
    medium: 'medium',
    high: 'high'
  }
  
  const STATUSES = {
    inProgress: 'inProgress',
    completed: 'completed',
  }
  
  const resolvePriority = priority => 
  priority === PRIORITIES.low ? "Låg"
  : priority === PRIORITIES.medium ? "Medium"
  : "Hög"
  
  const resolveStatus = status =>
  status === STATUSES.inProgress ? 'Pågående'
  : "Klar"

const TasksList = ({ myTasks }) => {


    return (
        <List
        keys={['Titel', 'Prioritet', 'Status']}
        >
        {myTasks.map(task => (
          <div className="data" key={task._id}>
            <p className="dataItem">{task.title}</p>
            <p className="dataItem">{resolvePriority(task.priority)}</p>
            <p className="dataItem">{resolveStatus(task.status)}</p>
            <p className="viewButton"><RemoveRedEyeIcon/></p>
          </div>
        ))}
      </List>
    )

};

export default TasksList;
