import React, { useState } from 'react'

import './Building.scss'

import Button from '../core/Button/Button'

const Building = ({  name, tasks, members, id,}) => {

    const [viewDetails, setViewDetails] = useState(false)

    return (
        <>
        <div className="building">
            <h4 className="title">{name}</h4>
            <p className="availableTasks">Tillgängliga uppgifter: {tasks.length}</p>
            <p className="memberCount">Antal medlemmar: {members.length}</p>
            {!viewDetails && <Button className="button" onClick={() => setViewDetails(true)}>Visa mer</Button>}
            {viewDetails && <Button className="button" onClick={() => setViewDetails(false)}>Dölj information</Button>}

        </div>
        {viewDetails && 
            <div>
                <p>{JSON.stringify(members)}</p>
                <p>{JSON.stringify(tasks)}</p>
            </div>
            }
        </>
    )
}

export default Building
