import React from 'react';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

import { useData } from '../../../providers/DataProvider'


import List from '../List';

import { clsx } from '../../../utils/utils'

const PRIORITIES = {
    low: 'low',
    medium: 'medium',
    high: 'high'
  }
  
  const STATUSES = {
    idle: 'idle',
    inProgress: 'inProgress',
    completed: 'completed',
  }
  
  const resolvePriority = priority => 
  priority === PRIORITIES.low ? "Låg"
  : priority === PRIORITIES.medium ? "Medium"
  : "Hög"
  
  const resolveStatus = status =>
  status === STATUSES.inProgress ? 'Pågående'
  : status === STATUSES.idle ? "Inte tilldelad" 
  : "Klar"

const TasksList = ({ 
    myTasks, 
    withEye, 
    withAcceptDenyIcons,
    withAcceptIcon,
    withDenyIcon,
    withAssignIcon,
    ...props 
  }) => {


    const { showModalVariant, setSelectedTaskID } = useData()

    return (
        <List
        keys={['Titel', 'Prioritet', 'Status']}
        {...props}
        >
        {myTasks.map(task => (
          <div className="data" key={task._id}>
            <p className="dataItem ">{task.title}</p>
            <p className="dataItem  ">{resolvePriority(task.priority)}</p>
            <p className="dataItem ">
              <span 
                className={clsx({
                  status: true,
                  [`status--${task.status}`]: true
                })}
                >
                {resolveStatus(task.status)}
              </span>
            </p>
            {withEye && <p className="viewButton"><RemoveRedEyeIcon/></p>}
            {withAcceptDenyIcons && 
              <div className="acceptDenyButtons">
                  <p className="denyIcon"><CancelIcon/></p>
                  <p className="acceptIcon"><CheckCircleIcon/></p>
              </div>
            }
            {withDenyIcon && <div className="acceptDenyButtons"><p className="denyIcon"><CancelIcon/></p></div>}
            {withAssignIcon && <div className="viewButton"><p className="assignIcon" onClick={() => (showModalVariant("takeTask"), setSelectedTaskID(task._id))} ><AssignmentIcon/></p></div>}
          </div>
        ))}
      </List>
    )

};

export default TasksList;
