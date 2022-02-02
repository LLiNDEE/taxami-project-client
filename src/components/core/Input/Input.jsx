import React from 'react'

import TextField from '@mui/material/TextField'

const Input = ({label, ...props}) => {
    return (
        <TextField 
            type={props?.type} 
            className="input" 
            id="outlined-basic" 
            label={label} 
            variant="outlined"
            {...props} 
        />
    )
}

export default Input
