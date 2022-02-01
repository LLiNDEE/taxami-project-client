import React from 'react';
import Form from '../Form/Form';

import withForm from '../Form/withForm';

const PromoCodeForm = () => {
  return (
      <div>
          <Form.Input name="code" label="Kod" />
      </div>
  )
};

export default withForm(PromoCodeForm);
