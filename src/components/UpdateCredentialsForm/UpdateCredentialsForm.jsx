import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SaveIcon from '@mui/icons-material/Save';

import './UpdateCredentialsForm.scss'

import Input from '../core/Input/Input'
import Button from '../core/Button/Button'
import ErrorMessage from '../Alerts/ErrorMessage'
import InfoMessage from '../Alerts/InfoMessage'
import useBreakpoint from '../../hooks/useBreakpoint'
import { useGlobal } from '../../providers/GlobalProvider'

const Schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
})

const UpdateCredentialsForm = ({ credentials, execute, success }) => {

    const { userID } = useGlobal()
    const { sm } = useBreakpoint()

    const { handleSubmit, control, formState: { errors }, clearErrors, watch } = useForm({
        resolver: yupResolver(Schema)
    })

    const onSubmit = data => execute({...data, user_id: userID})

    return (
      <div className="updateCredentialsContainer">
        <form onSubmit={handleSubmit(onSubmit)} >
            <Controller
                name="first_name"
                defaultValue={credentials.first_name}
                control={control}
                render={({ field }) => <Input label="Förnamn" {...field} error={!!errors.first_name} ref={null} />}
            />
            {!!errors.first_name && <ErrorMessage message="Du måste fylla i ett förnamn" />}
            <Controller
              name="last_name"
              defaultValue={credentials.last_name}
              control={control}
              render={({ field }) => <Input label="Efternamn" error={!!errors.last_name} {...field} ref={null} />}
            />
            {!!errors.last_name && <ErrorMessage message="Du måste fylla i ett efternamn"/>}
            <Controller
              name="email"
              defaultValue={credentials.email}
              control={control}
              render={({ field }) => <Input label="Epost" error={!!errors.email}  {...field}  ref={null} />}
            />
            {!!errors.email && <ErrorMessage message="Du måste fylla i en korrekt e-post" />}
            {sm && success && <InfoMessage message="Dina uppgifter har blivit uppdaterade!" />}
            <Button className="submitButton"><SaveIcon/>Spara</Button>
        </form>
      </div>
  )
}

export default UpdateCredentialsForm