import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import PromoCodeForm from '../components/register/PromoCodeForm';
import RegisterForm from '../components/register/RegisterForm';
import { useRegisterProvider } from '../providers/RegisterProvider'
import { SERVER_ERROR_MESSAGES } from '../utils/constants';

const verifyCodeSchema = yup.object().shape({
    code: yup.string().min(36).required()
})

const registerFormSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    code: yup.string().required(),
})

const steps = ['Verifiera kod', 'Registrera uppgifter', 'Registrering klar']

const RegisterPage = () => {

    const { isCodeValid, verifyCode, verifyCodeError, verifyCodeStatus, register, registerError, registerStatus, activeStep, isRegistered } = useRegisterProvider()

    return (
        <div className="registerPage">
            <h2 className="registerTitle">Registrera dig</h2>
            <div className="stepper">
                <Stepper sx={{ width: '100%' }} activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </div>

            {!isCodeValid && 
                <>
                    <PromoCodeForm
                        schema={verifyCodeSchema}
                        isError={verifyCodeError}
                        status={verifyCodeStatus}
                        submitText="Verifiera kod"
                        onSubmit={verifyCode}
                        feedback={SERVER_ERROR_MESSAGES['noCode']}
                    />
                </>
            }

            {isCodeValid && !isRegistered && 
                <RegisterForm
                    schema={registerFormSchema}
                    isError={registerError}
                    status={registerStatus}
                    submitText="Registrera"
                    onSubmit={register}
                    feedback={SERVER_ERROR_MESSAGES['error']}
                />
            }

            {isRegistered && 
                <div className="registerComplete">
                    <h3 className="registerCompleteTitle">Registreringen är klar!</h3>
                    <p className="registerCompleteText">Klicka på <Link className="registerCompleteLink" to="/loggain">Logga in</Link> för att logga in.</p>
                </div>
            }
  

        </div>
    )
};

export default RegisterPage;
