import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useGlobal } from '../../../providers/GlobalProvider'
import { useData } from '../../../providers/DataProvider';


import List from '../List';

import './TaskListWithAccordion.scss'

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

const TaskListWithAccordion = ({ 
    myTasks, 
    withEye, 
    withAcceptDenyIcons,
    withAcceptIcon,
    withDenyIcon,
    withAssignIcon,
    ...props 
  }) => {

    const { userID } = useGlobal()
    const { markTaskAsComplete, leaveTask } = useData()


    return (
        <List
        keys={['Titel', 'Prioritet', 'Status']}
        {...props}
        >
        {myTasks.map(task => (
        <Accordion key={task._id}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div className="dataAccordion">
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
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="taskDetails">
                    <p className="detailsItem">Förväntad tid: {task.details.estimated_time} minuter</p>
                    <p className="detailsItem">Förväntad kostnad: {task.details.estimated_cost} kr</p>
                </div>
                <p className="description">Beskrivning: <span className="descriptionText" >{task.description}</span></p>
                <p className="optionalComment">Övrig kommentar: {task.details.optional_comment}</p>
                <div className="buttons">
                    {(withAcceptDenyIcons || task.status === 'inProgress') && 
                        <>
                            <p className="iconText denyIcon" onClick={() => leaveTask({user_id: userID, task_id: task._id})} ><CancelIcon/> Lämna uppgift</p>
                            <p className="iconText acceptIcon" onClick={() => markTaskAsComplete({user_id: userID, task_id: task._id})}><CheckCircleIcon/> Markera som klar</p>
                        </>
                    }
                    {(withDenyIcon || task.status === 'completed') && <p className="denyIcon iconText"><CancelIcon/> Ta bort klar markering</p>}
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default TaskListWithAccordion;
