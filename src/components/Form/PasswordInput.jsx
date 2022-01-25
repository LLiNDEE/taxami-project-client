import React, { useState } from 'react';
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment'

const PasswordInput = ({ label, name, control, withEye, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

    return(
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => <TextField 
                                        type={showPassword ? "text" : "password"} 
                                        className="input" 
                                        id="outlined-basic" 
                                        label={label} 
                                        variant="outlined"
                                        {...withEye ? {
                                            InputProps:{
                                                endAdornment: 
                                                    <InputAdornment position="end">
                                                      {showPassword ? <VisibilityOffIcon onClick={() => setShowPassword(false)} /> : <VisibilityIcon onClick={() => setShowPassword(true)}/>}
                                                    </InputAdornment>
                                            }
                                        } : null }
                                        {...props} 
                                        {...field}/>}
        />
    )
};

export default PasswordInput;
