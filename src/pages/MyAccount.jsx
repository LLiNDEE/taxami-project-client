import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import UpdateCredentialsForm from '../components/UpdateCredentialsForm/UpdateCredentialsForm'
import CircularProgressWithLabel from '../components/CircularProgressWithLabel/CircularProgressWithLabel';
import Snackbar from '../components/Snackbar/Snackbar'
import useBreakpoint from '../hooks/useBreakpoint';
import useUserUpdate from '../api/useUserUpdate'
import { useGlobal } from '../providers/GlobalProvider'


const updateSessionStorage = values => sessionStorage.setItem('userData', JSON.stringify(values))

const MyAccount = () => {

    const { userData, setUserData } = useGlobal()
    const { sm } = useBreakpoint()

    const { execute: updateUser, isSuccess: userUpdateSuccess, isError: userUpdateError, isLoading: userUpdateLoading, data: userUpdateData } = useUserUpdate()

    const [showSnackbar, setShowSnackbar] = useState(false)
    const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)

    useEffect(() => {
        if(!userUpdateSuccess) return

        setTimeout( () => {
            setShowSnackbar(false)
            setShowSuccessSnackbar(true)
        },500)
        
        const updatedData = userUpdateData.data.updated_data
        updateSessionStorage(updatedData)
        setUserData(updatedData)

    },[userUpdateSuccess])

    useEffect(() => {
        if(!userUpdateLoading) return
        setShowSuccessSnackbar(false)
        setShowSnackbar(true)
    },[userUpdateLoading])

    return (
        <div className="myAccountContainer">
            <h1 className="myAccountTitle">Mitt konto</h1>
            <UpdateCredentialsForm credentials={userData} execute={updateUser} success={!!userUpdateSuccess} />
            {!sm && showSuccessSnackbar && <Snackbar initial={true} message="Dina uppgifter har blivit uppdaterade!"/>}
            {!sm && showSnackbar && <CircularProgressWithLabel message="Uppdaterar uppgifter..."/>}
        </div>
    )
}

export default MyAccount