import React from 'react'

import TextField from '@mui/material/TextField'

const Input = ({label, readOnly, ...props}) => {
    return (
        <TextField 
            type={props?.type} 
            className="input" 
            id={props?.id ?? "outlined-basic"} 
            label={label} 
            variant="outlined"
            {...readOnly ? 
            {
                InputProps:{
                    readOnly: true
                }
            } : null }
            {...props} 
        />
    )
}

export default Input
