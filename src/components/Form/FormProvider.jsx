import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import Flex from '../core/Flex/Flex'

const contextForm = createContext({})

const FormProvider = ({ children, submitText, onSubmit, schema }) => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmitTest = data => onSubmit(data)

  return (
      <contextForm.Provider value={{ control, errors }}>
          <form onSubmit={handleSubmit(onSubmitTest)}>
            {children}
            <Flex justify="right">
                <input type="submit" value={submitText}/>
            </Flex>
          </form>
      </contextForm.Provider>
  )
};

export const useFormProvider = () => useContext(contextForm)

export default FormProvider;
