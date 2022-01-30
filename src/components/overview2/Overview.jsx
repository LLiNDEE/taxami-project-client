import React from 'react'

import './Overview.scss'

import Building from './Building'
import TaskOverview from './TaskOverview'
import Flex from '../core/Flex/Flex'
import { useGlobal } from '../../providers/GlobalProvider'

const Overview = () => {

    const { buildings, tasks } = useGlobal()

    return (
        <div className="overview">
            <h2 className="title">Översikt</h2>
            <div className="overviewItem">
                <h2 className="overviewTitle">Byggnader</h2>
                {buildings.map(building => (
                    <Building key={building._id} name={building.building_name} tasks={building.tasks} members={building.members} id={building._id}/>
                ))}
            </div>
            <div>
                <h2 className="overviewTitle">Pågående uppgifter</h2>
                {tasks && tasks.filter(task => task.status !== 'completed').map(task => (
                    <TaskOverview key={task._id}  title={task.title} details={task.details} status={task.status} priority={task.priority} id={task._id} />
                ))}
            </div>
            <div className="overviewItem">
                <h2 className="overviewTitle">Avklarade uppgifter</h2>
                {tasks && tasks.filter(task => task.status !== 'inProgress').map(task => (
                    <TaskOverview key={task._id} title={task.title} details={task.details} status={task.status} priority={task.priority} id={task._id} />
                ))}
            </div>
        </div>
    )
}

export default Overview