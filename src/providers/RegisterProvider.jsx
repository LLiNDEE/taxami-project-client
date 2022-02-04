import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

import useVerifyCode from '../api/useVerifyCode';
import useRegister from '../api/useRegister';
import useBoolean from '../hooks/useBoolean';
import useQuery from '../hooks/useQuery';

const contextRegister = createContext({})

const RegisterProvider = ({ children }) => {

    const { params, push } = useQuery()

    const {execute: verifyCode, isSuccess: isCodeSuccess, isError: verifyCodeError, status: verifyCodeStatus, data: codeData} = useVerifyCode()
    const {execute: register, isSuccess: registerSuccess, isError: registerError, status: registerStatus } = useRegister()

    const [isCodeValid, { on: codeIsValid, off: codeNotValid }] = useBoolean(undefined)
    const [isRegistered, { set: setIsRegistered }] = useBoolean(undefined)

    const [activeStep, setActiveStep] = useState(0)

    const code = useMemo(() => params.get('code'), [isCodeValid])

    useEffect(() => {
        const checkCode = params.get('code')
        if(!code) return

        verifyCode({code: checkCode})

    },[])

    useEffect(() => {
        if(!isCodeSuccess) return

        codeIsValid()
        setActiveStep(1)

        params.set("code", codeData.data.code)
        push()

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
      <contextRegister.Provider value={{ code, isCodeValid, verifyCode, verifyCodeError, verifyCodeStatus, register, registerError, registerStatus, isRegistered, activeStep }}>
          {children}
      </contextRegister.Provider>
  );
};


export const useRegisterProvider = () => useContext(contextRegister)

export default RegisterProvider;


