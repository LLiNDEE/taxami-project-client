import React from 'react';
import { Link } from 'react-router-dom'

import Form from '../Form/Form';
import withForm from '../Form/withForm';
import Flex from '../core/Flex/Flex';

const PromoCodeForm = () => {
  return (
      <div>
        <Flex justify="center" align="center">
          {/* <p className="promoCodeFormTitle">Ange din prenumerations- eller inbjudningskod</p> */}
        </Flex>
          <Form.Input name="code" label="Ange din prenumerations- eller inbjudningskod"/>
          <p className="textWithLink">Har du redan ett konto? <Link className="link" to="/loggain" >Logga in</Link></p>
      </div>
  )
};

export default withForm(PromoCodeForm);
