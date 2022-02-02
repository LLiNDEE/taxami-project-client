import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Form from './Form/Form.jsx'
import withForm from './Form/withForm'

import Flex from '../components/core/Flex/Flex.jsx'

const LoginForm = () => {

  return (
      <div className="loginForm">
          <Flex justify="center">
            <h2 className="loginFormTitle">Logga in</h2>
          </Flex>

          <Form.Input name="email" label="E-post"/>
          <Form.PasswordInput
            name="password"
            label="Lösenord"
            withEye
          />
          <Link to="/registrera">Registrera konto</Link>

      </div>
  )
};

export default withForm(LoginForm);
