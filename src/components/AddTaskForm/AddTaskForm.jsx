import React, { useState } from 'react';
import { Controller } from 'react-hook-form'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuItem from '@mui/material/MenuItem';

import './AddTaskForm.scss'

import Select from '../core/select/Select';
import Input from '../core/Input/Input'

const AddTaskForm = ({ control, errors, onSubmitFunc, cancelFunc }) => {

  const [priorities, setPriorities] = useState(undefined)

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
          error={errors.priority}
          render={({ field }) => 
          <Select label="Prioritet" value={priorities} onChange={e => setPriorities(e.target.value)} {...field} >
            <MenuItem value="low" >Låg</MenuItem>
            <MenuItem value="high" >Hög</MenuItem>
          </Select>}
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
