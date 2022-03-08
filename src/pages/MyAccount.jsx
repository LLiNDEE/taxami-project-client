import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import UpdateCredentialsForm from '../components/UpdateCredentialsForm/UpdateCredentialsForm'
import useUserUpdate from '../api/useUserUpdate'
import { useGlobal } from '../providers/GlobalProvider'
import Snackbar from '../components/Snackbar/Snackbar'

import CircularProgressWithLabel from '../components/CircularProgressWithLabel/CircularProgressWithLabel';

const MyAccount = () => {

    const { userData } = useGlobal()

    const { execute: updateUser, isSuccess: userUpdateSuccess, isError: userUpdateError, isLoading: userUpdateLoading } = useUserUpdate()

    const [showSnackbar, setShowSnackbar] = useState(false)

    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)

    useEffect(() => {
        if(!userUpdateSuccess) return

        setTimeout( () => {
            setShowSnackbar(false)
            setShowSuccessSnackbar(true)
        },1000)

  

    },[userUpdateSuccess])

    useEffect(() => {
        if(!userUpdateLoading) return
        setShowSuccessSnackbar(false)
        setShowSnackbar(true)
    },[userUpdateLoading])

    return (
        <div className="myAccountContainer">
            <h1 className="myAccountTitle">Mitt konto</h1>
            <UpdateCredentialsForm credentials={userData} execute={updateUser} />
            {/* {showSnackbar && <Snackbar initial={true} message="Uppdaterar uppgifter..." content={<CircularProgress/>} />} */}
            {/* {showSnackbar && <CustomSnackbar initial={true} message="Uppdaterar uppgifter..." content={<CircularProgress/>} />} */}
            {showSuccessSnackbar && <Snackbar initial={true} message="Dina uppgifter har blivit uppdaterade!"/>}
            {showSnackbar && <CircularProgressWithLabel message="Uppdaterar uppgifter..."/>}
        </div>
    )
}

export default MyAccount