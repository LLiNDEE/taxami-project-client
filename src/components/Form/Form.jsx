import React from 'react'

import FormProvider, { useFormProvider } from './FormProvider';
import Input from './Fields/Input.jsx'
import PasswordInput from './Fields/PasswordInput'

const connect = Comp => ({ name, isError, ...props }) => {
    
    const { control, errors } = useFormProvider()

    return (
        <Comp
            control={control}
            name={name}
            error={!!errors[name] || isError}
            {...props}
        />
    )
}

const Form = props => <FormProvider {...props}/>


Form.Input = connect(Input)
Form.PasswordInput = connect(PasswordInput)

export default Form;
