import React, { createContext, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import Flex from '../core/Flex/Flex'
import ErrorMessage from '../Alerts/ErrorMessage';

const contextForm = createContext({})

export const FORM_STATE = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    ERROR: 'ERROR',
    DISABLED: 'DISABLED',
    SUCCESS: 'SUCCESS'
}

const FormProvider = ({ children, submitText, onSubmit, schema, status, feedback }) => {

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if(status !== FORM_STATE.ERROR) return

        reset()

    },[status])

    const onSubmitTest = data => onSubmit(data)

  return (
      <contextForm.Provider value={{ control, errors }}>
          <form onSubmit={handleSubmit(onSubmitTest)}>
              
            {children}

            {status === FORM_STATE.ERROR && <ErrorMessage message={feedback ?? "Någonting gick fel..."} />}

            <Flex justify="right">
                <input type="submit" value={submitText}/>
            </Flex>
          </form>
      </contextForm.Provider>
  )
};

export const useFormProvider = () => useContext(contextForm)

export default FormProvider;
