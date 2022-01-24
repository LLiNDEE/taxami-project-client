import React from 'react'
import FormProvider, { useFormProvider } from './FormProvider';
import Input from './Input.jsx'

const connect = Comp => ({ name, ...props }) => {
    
    const { control, errors } = useFormProvider()

    return (
        <Comp
            control={control}
            name={name}
            error={!!errors[name]}
            {...props}
        />
    )
}

const Form = props => <FormProvider {...props}/>


Form.Input = connect(Input)

export default Form;
