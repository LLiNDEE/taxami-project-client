import React from 'react'
import Alert from '@mui/material/Alert'

const SuccessMessage = ({ message }) => {
    return (
        <Alert severity="success" >{message}</Alert>
    )
}

export default SuccessMessage
