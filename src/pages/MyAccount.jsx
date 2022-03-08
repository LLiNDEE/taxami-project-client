import React, { useState } from 'react'

import UpdateCredentialsForm from '../components/UpdateCredentialsForm/UpdateCredentialsForm'
import { useGlobal } from '../providers/GlobalProvider'

const MyAccount = () => {

    const { userData } = useGlobal()

    return (
        <div className="myAccountContainer">
            <h1 className="myAccountTitle">Mitt konto</h1>
            <p>Förnamn: {userData.first_name}</p>
            <p>Efternamn: {userData.last_name}</p>
            <p>Email: {userData.email}</p>
            <UpdateCredentialsForm credentials={userData} />
        </div>
    )
}

export default MyAccount