import React, { createContext, useContext, useEffect, useState } from 'react';

import useVerifyCode from '../api/useVerifyCode';
import useRegister from '../api/useRegister';
import useBoolean from '../hooks/useBoolean';

const contextRegister = createContext({})

const RegisterProvider = ({ children }) => {

    const {execute: verifyCode, isSuccess: isCodeSuccess, isError: verifyCodeError, status: verifyCodeStatus, data: codeData} = useVerifyCode()
    const {execute: register, isSuccess: registerSuccess, isError: registerError, status: registerStatus } = useRegister()

    const [code, setCode] = useState(undefined)
    const [isCodeValid, { on: codeIsValid, off: codeNotValid }] = useBoolean(undefined)
    const [isRegistered, { set: setIsRegistered }] = useBoolean(undefined)

    const [activeStep, setActiveStep] = useState(0)

    useEffect(() => {
        if(!isCodeSuccess) return

        codeIsValid()
        setCode(codeData.data.code)
        setActiveStep(1)

    },[isCodeSuccess])

    useEffect(() => {
        if(!verifyCodeError) return

        codeNotValid()

    },[verifyCodeError])

    useEffect(() => {
        if(!registerSuccess) return

        setIsRegistered(true)
        setActiveStep(3)

    },[registerSuccess])

  return (
      <contextRegister.Provider value={{ setCode, code, isCodeValid, verifyCode, verifyCodeError, verifyCodeStatus, register, registerError, registerStatus, isRegistered, activeStep }}>
          {children}
      </contextRegister.Provider>
  );
};


export const useRegisterProvider = () => useContext(contextRegister)

export default RegisterProvider;


