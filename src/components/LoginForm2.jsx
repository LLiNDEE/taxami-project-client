import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

import Flex from '../components/core/Flex/Flex.jsx'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
})

const LoginForm = () => {

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = data => console.log(data)

  return (
      <div className="loginForm">
          <Flex justify="center">
            <h2 className="loginFormTitle">Logga in</h2>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="email"
                    control={control}
                    schema="email"
                    defaultValue=""
                    render={({ field }) => <TextField 
                                                type="email" 
                                                className="input" 
                                                id="outlined-basic" 
                                                label="E-post" 
                                                variant="outlined" 
                                                error={!!errors?.email}
                                                {...field} />}
                />
            </div>
            <div>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField 
                                                type="password" 
                                                className="input" 
                                                id="outlined-basic" 
                                                label="Lösenord" 
                                                variant="outlined" 
                                                error={!!errors?.password}
                                                {...field} />}
                />
            </div>
            <Flex justify="right">
                <input type="submit" value="Logga in" className="loginButton"/>
            </Flex>
          </form>
      </div>
  )
};

export default LoginForm;
