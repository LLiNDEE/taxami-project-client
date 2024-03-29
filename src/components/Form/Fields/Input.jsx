import React, { useState } from 'react';
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

const Input = ({ label, name, control, value, ...props }) => {

    return(
        <Controller
            name={name}
            control={control}
            defaultValue={value ?? ""}
            render={({ field }) => <TextField 
                                        type={props?.type} 
                                        className="input" 
                                        id="outlined-basic" 
                                        label={label} 
                                        variant="outlined"
                                        {...props} 
                                        {...field}/>}
        />
    )
};

export default Input;
