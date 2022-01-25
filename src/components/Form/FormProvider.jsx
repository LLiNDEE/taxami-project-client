import React, { createContext, useContext, useEffect, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import Flex from '../core/Flex/Flex'
import ErrorMessage from '../Alerts/ErrorMessage';
import Submit from './Adornment/Submit'
import { STATUS } from '../../hooks/useAsync'
import { clsx } from '../../utils/utils'

const contextForm = createContext({})

export const FORM_STATE = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    DISABLED: 'DISABLED',
    SUCCESS: 'SUCCESS'
}

const resolveFormState = status => (
    status === STATUS.PENDING ? FORM_STATE.LOADING
    : status === STATUS.ERROR ? FORM_STATE.ERROR
    : status === STATUS.SUCCESS ? FORM_STATE.SUCCESS
    : FORM_STATE.IDLE
)

const FormProvider = ({ children, submitText, onSubmit, schema, status, feedback }) => {

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const formState = useMemo(() => resolveFormState(status), [status])  

    useEffect(() => {
        if(status !== FORM_STATE.ERROR) return

        // reset()

    },[status])

    const onSubmitTest = data => onSubmit(data)

  return (
      <contextForm.Provider value={{ control, errors }}>
        <div style={{position: "relative"}}>
            <div className={clsx({ lowerOpacity: formState === FORM_STATE.LOADING })}>
                <form onSubmit={handleSubmit(onSubmitTest)}>
                    
                    {children}
        
                    {formState === FORM_STATE.ERROR && <ErrorMessage message={feedback ?? "Någonting gick fel..."} />}
        
                    <Flex justify="right">
                        {/* <input type="submit" value={submitText}/> */}
                        <Submit>{submitText}</Submit>
                    </Flex>
                </form>
            </div>
            {formState === FORM_STATE.LOADING &&  <CircularProgress className="loadingSpinner" />}
        </div>
      </contextForm.Provider>
  )
};

export const useFormProvider = () => useContext(contextForm)

export default FormProvider;
