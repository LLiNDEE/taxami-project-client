import React, { useState } from 'react'
import * as yup from 'yup'

import LoginForm from '../components/LoginForm';
import useLogin from '../api/useLogin'

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required()
})

const LandingPage = () => {

  const { execute, isError, isSuccess, status } = useLogin()

  return (
      <div className="landingPage">
          <LoginForm
            schema={loginSchema}
            submitText="Logga in"
            onSubmit={execute}
          />
      </div>
  );
};

export default LandingPage;
