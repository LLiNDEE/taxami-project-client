import React from "react";
import * as yup from 'yup'

import LoginForm from '../components/LoginForm';
import useLogin from '../api/useLogin'
import { SERVER_ERROR_MESSAGES } from '../utils/constants'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required()
})

const LoginPage = () => {

    const { execute, isError, isSuccess, status } = useLogin()

    return (
        <div className="loginPage">
            <LoginForm
              schema={loginSchema}
              isError={isError}
              status={status}
              submitText="Logga in"
              onSubmit={execute}
              feedback={SERVER_ERROR_MESSAGES['invalidCredentials']}
            />
        </div>
    )

}

export default LoginPage

