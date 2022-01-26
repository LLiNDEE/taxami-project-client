import React from 'react'

import './TaskOverview.scss'

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

const TaskOverview = ({ title, status, priority, id, details}) => {
    return (
        <div className="task">
            <h4 className="taskTitle">{title}</h4>
            <p className="taskStatus">Status: {resolveStatus(status)}</p>
            <p className="taskPriority">Prioritet: {resolvePriority(priority)}</p>
            {status === STATUSES.inProgress && <button className="completeButton">Markera som klar</button>}
            {status === STATUSES.completed && <button className="completeButton removeCompleteButton">Ändra text...</button> }
        </div>
    )
}

export default TaskOverview
