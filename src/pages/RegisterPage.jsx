import React, { useEffect } from 'react';
import * as yup from 'yup'

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

const RegisterPage = () => {

    const { isCodeValid, verifyCode, verifyCodeError, verifyCodeStatus, register, registerError, registerStatus } = useRegisterProvider()

    return (
        <div className="registerPage">
            <h2>Register page??</h2>
            {!isCodeValid && 
                <PromoCodeForm
                    schema={verifyCodeSchema}
                    isError={verifyCodeError}
                    status={verifyCodeStatus}
                    submitText="Verifiera kod"
                    onSubmit={verifyCode}
                    feedback={SERVER_ERROR_MESSAGES['noCode']}
                />
            }

            {isCodeValid && 
                <RegisterForm
                    schema={registerFormSchema}
                    isError={registerError}
                    status={registerStatus}
                    submitText="Registrera"
                    onSubmit={register}
                    feedback={SERVER_ERROR_MESSAGES['error']}
                />
            }

        </div>
    )
};

export default RegisterPage;
