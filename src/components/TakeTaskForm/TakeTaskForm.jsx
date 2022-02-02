import React from 'react'

import './TakeTaskForm.scss'

import Input from '../core/Input/Input'

const TakeTaskForm = ({ data, setData }) => {


    return (
        <div className="takeTaskForm">
            <Input label="Förväntad kostnad (kronor)" value={data.estimated_cost} onChange={(e) => setData(v => ({...v, estimated_cost: e.target.value}))} />
            <Input label="Förväntad tid (minuter)" value={data.estimated_time} onChange={(e) => setData(v => ({...v, estimated_time: e.target.value}))} />
            <Input label="Valfri kommentar" value={data.optional_comment} onChange={(e) => setData(v => ({...v, optional_comment: e.target.value}))} multiline />
        </div>
    )
}

export default TakeTaskForm