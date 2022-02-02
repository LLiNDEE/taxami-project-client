import React from 'react'

import './TakeTaskForm.scss'

import Input from '../core/Input/Input'

const TakeTaskForm = ({ takeTaskDetails, setTakeTaskDetails }) => {


    return (
        <div className="takeTaskForm">
            <Input label="Förväntad kostnad (kronor)" value={takeTaskDetails.estimated_cost} onChange={(e) => setTakeTaskDetails(v => ({...v, estimated_cost: e.target.value}))} />
            <Input label="Förväntad tid (minuter)" value={takeTaskDetails.estimated_time} onChange={(e) => setTakeTaskDetails(v => ({...v, estimated_time: e.target.value}))} />
            <Input label="Valfri kommentar" value={takeTaskDetails.optional_comment} onChange={(e) => setTakeTaskDetails(v => ({...v, optional_comment: e.target.value}))} multiline />
        </div>
    )
}

export default TakeTaskForm