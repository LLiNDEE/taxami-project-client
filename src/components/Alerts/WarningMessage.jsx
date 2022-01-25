import React from 'react'
import Alert from '@mui/material/Alert'

const WarningMessage = ({ message }) => {
    return (
        <Alert severity='warning'>{message}</Alert>
    )
}

export default WarningMessage
