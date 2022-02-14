import React from 'react'
import { Controller } from 'react-hook-form'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './CreateBuildingForm.scss'

import Input from '../core/Input/Input'

const CreateBuildingForm = ({ control, errors, onSubmitFunc, cancelFunc }) => {
  return (
      <form className="createBuildingForm" onSubmit={onSubmitFunc}>
            <Controller
                name="building_name"
                control={control}
                defaultValue=""
                error={errors.building_name}
                render={({ field }) => <Input label="Byggnadens namn" error={!!errors.building_name} {...field} ref={null} />}
            />
            <div className="formButtons">
                <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/>Avbryt</p>
                <button className="iconWithText submitButton" > <CheckCircleIcon/> Skapa</button>
            </div>
      </form>
  )
}

export default CreateBuildingForm