import React, { useState, forwardRef } from 'react'
import { Snackbar as MUISnackbar } from '@mui/material'
import MUIAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref){
    return <MUIAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const CustomSnackbar = ({ initial, message, content }) => {

    const [open, setOpen] = useState(!!initial)

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') return
        setOpen(false)
    }



  return (
    <MUISnackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose} 
        message={
        <div style={{backgroundColor: "white"}}>
            {content && content}
            {message}
        </div>
        } 
    />
  )
}

export default CustomSnackbar