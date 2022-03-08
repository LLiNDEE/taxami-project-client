import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from '../core/Input/Input'

const Schema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
})

const UpdateCredentialsForm = ({ credentials }) => {


    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    })

  return (
    <div>
        <Input label="Förnamn"/>
        <Input label="Efternamn" />
        <Input label="Epost" />
    </div>
  )
}

export default UpdateCredentialsForm