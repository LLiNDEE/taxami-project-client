import React from 'react';
import { Controller } from 'react-hook-form'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import './AddTaskForm.scss'

import Input from '../core/Input/Input'

const AddTaskForm = ({ control, errors, onSubmitFunc, cancelFunc }) => {
  return (
    <form onSubmit={onSubmitFunc}  className="addTaskForm">
        <Controller
            name="title"
            control={control}
            defaultValue=""
            error={errors.title}
            render={({ field }) => <Input label="Titel" error={!!errors.title} {...field} ref={null} />}
        />
        <Controller
            name="priority"
            control={control}
            defaultValue=""
            render={({ field }) =>  <Input label="Prioritet" error={!!errors.priority} {...field} ref={null} />}
        />
        <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) =>  <Input label="Beskrivning" error={!!errors.description} multiline {...field} ref={null} />}
        />
        
       <div className="formButtons">
            <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/>Avbryt</p>
            <button className="iconWithText submitButton" > <CheckCircleIcon/> Lägg till</button>
       </div>
       
    </form>
  )
};

export default AddTaskForm;
