import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Input from '../core/Input/Input'

const Schema = yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string().email(),
})

const UpdateCredentialsForm = ({ credentials }) => {


    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    })

    const onSubmit = data => console.log(data)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
          <Controller
              name="first_name"
              defaultValue={credentials.first_name}
              control={control}
              render={({ field }) => <Input label="Förnamn" {...field} ref={null} />}
          />
          <Controller
            name="last_name"
            defaultValue={credentials.last_name}
            control={control}
            render={({ field }) => <Input label="Efternamn" {...field} ref={null} />}
          />
          <Controller
            name="email"
            defaultValue={credentials.email}
            control={control}
            render={({ field }) => <Input label="Epost"  {...field}  ref={null} />}
          />
          <button>Spara</button>
      </form>
    </div>
  )
}

export default UpdateCredentialsForm