import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
    members,
    ...props 
  }) => {

    const { userID } = useGlobal()
    const { markTaskAsComplete, hideModal, showModalVariant, setSelectedTaskID } = useData()


    return (
        <List
        keys={['Titel', 'Prioritet', 'Status']}
        {...props}
        >
        {myTasks < 1 && <p className="noTasksText">Det finns inga uppgifter</p>}
        {myTasks.length > 0 && myTasks.map(task => (
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
                {task.status !== 'idle' && 
                    <>
                        <div className="taskDetails">
                            <p className="detailsItem">Förväntad tid: {task.details.estimated_time} minuter</p>
                            <p className="detailsItem">Förväntad kostnad: {task.details.estimated_cost} kr</p>
                        </div>
                        <p className="description">Beskrivning: <span className="descriptionText" >{task.description}</span></p>
                        <p className="optionalComment">Övrig kommentar: {task.details.optional_comment}</p>
                    </>
                }
                {task.status === 'idle' && 
                    <>
                        <div className="taskDetails">
                            <p className="description">Beskrivning: <span className="descriptionText">{task.description}</span></p>
                        </div>
                    </>
                }
                
                <div className="buttons">
                    {(withAcceptDenyIcons || task.status === 'inProgress') && 
                        <>
                            <p className="iconText denyIcon" onClick={() => (showModalVariant('leaveTask'), setSelectedTaskID(task._id))} ><CancelIcon/> { userID === task.user_id ? "Ta bort pågående status" : "Lämna uppgift"}</p>
                            <p className="iconText acceptIcon" onClick={() => (showModalVariant('completeTask'), setSelectedTaskID(task._id))}><CheckCircleIcon/> Markera som klar</p>
                        </>
                    }
                    {(userID === task.user_id && task.status === 'idle') && <p className="iconText removeTaskIcon" onClick={() => (showModalVariant('removeTask'), setSelectedTaskID(task._id))} ><DeleteForeverIcon/> Ta bort uppgift</p>}
                    {(withAssignIcon || task.status === 'idle') && <p className="iconText assignIcon" onClick={() => (showModalVariant("takeTask"), setSelectedTaskID(task._id))}><AssignmentIcon/> Antag uppgift </p> }
                    { userID === task.user_id && (withDenyIcon || task.status === 'completed') && <p className="denyIcon iconText" onClick={() => (showModalVariant('removeCompletedTask'), setSelectedTaskID(task._id))} ><CancelIcon/> Ta bort klar markering</p>}
                </div>
            </AccordionDetails>
        </Accordion>
        ))}
      </List>
    )

};

export default TaskListWithAccordion;
