import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import CardList from '../../Lists/CardList/CardList'

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
  return (
    <CardList>
        {tasks.map(task => (
            <div className="card" key={task._id}>
                <p className="cardTitle">{task.title}</p>
                <p className="cardData">Prioritet: {resolvePriority(task.priority)}</p>
                <p className="cardData">Status: <span className={`taskCardStatus status--${task.status}`}>{resolveStatus(task.status)}</span></p>
                <button className="cardButton"><RemoveRedEyeIcon/> Visa Uppgift</button>
            </div>
        ))}
    </CardList>
  )
}

export default TaskCardList