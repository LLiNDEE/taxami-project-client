import React, { useState, forwardRef } from 'react'
import { Snackbar as MUISnackbar } from '@mui/material'
import MUIAlert from '@mui/material/Alert'

import SuccessMessage from '../Alerts/SuccessMessage'

const Alert = forwardRef(function Alert(props, ref){
    return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Snackbar = ({ initial, message, content }) => {

    const [open, setOpen] = useState(!!initial)

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') return
        setOpen(false)
    }



  return (
    <MUISnackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            {content && content}
            {message}
        </Alert>
    </MUISnackbar>
  )
}

export default Snackbar