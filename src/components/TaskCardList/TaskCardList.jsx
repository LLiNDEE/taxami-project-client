import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import './TaskCardList.scss'

import CardList from '../Lists/CardList/CardList'
import { useGlobal } from '../../providers/GlobalProvider';
import { useData } from '../../providers/DataProvider';

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

const TaskCardList = ({ tasks }) => {

  const { showModalVariant } = useGlobal()
  const { setSelectedTaskID } = useData()

  return (
    <CardList>
        {tasks.map(task => (
            <div className="card taskCardList" key={task._id}>
                <p className="cardTitle">{task.title}</p>
                <p className="cardData">Prioritet: {resolvePriority(task.priority)}</p>
                <p className="cardData">Status: <span className={`taskCardStatus status--${task.status}`}>{resolveStatus(task.status)}</span></p>
                {task.status === 'idle' && <button className="cardButton" onClick={() => showModalVariant('viewTask', task)}><RemoveRedEyeIcon/>Välj</button>}
                {task.status === 'inProgress' && <button className="cardButton" onClick={() => (showModalVariant('viewInProgressTask', task), setSelectedTaskID(task._id))} ><RemoveRedEyeIcon/>Välj</button>}
            </div>
        ))}
    </CardList>
  )
}

export default TaskCardList