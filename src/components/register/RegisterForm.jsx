import React from 'react';

import Form from '../Form/Form';
import withForm from '../Form/withForm';
import { useRegisterProvider } from '../../providers/RegisterProvider';

const RegisterForm = () => {
    
    const { code } = useRegisterProvider()

  return (
      <div className="registerForm">
          <Form.Input name="first_name" label="Förnamn"/>
          <Form.Input name="last_name" label="Efternamn"/>
          <Form.Input name="username" label="Användarnamn"/>
          <Form.Input name="email" label="E-post"/>
          <Form.PasswordInput name="password" label="Lösenord" withEye />
          <Form.Input name="code" value={code} style={{ display: "none" }} />
      </div>
  )
};

export default withForm(RegisterForm);
