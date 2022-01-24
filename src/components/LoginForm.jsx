import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

import Flex from '../components/core/Flex/Flex.jsx'

const LoginForm = () => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const onSubmit = data => console.log(data)

  return (
      <div className="loginForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField className="input" id="outlined-basic" label="E-post" variant="outlined" {...field} />}
                />
            </div>
            <div>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField className="input" id="outlined-basic" label="Lösenord" variant="outlined" {...field} />}
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
