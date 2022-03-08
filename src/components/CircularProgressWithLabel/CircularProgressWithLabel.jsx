import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

import './CircularProgressWithLabel.scss'

const CircularProgressWithLabel = ({ message }) => {

    return (
        <div className="circularProgress">
            <CircularProgress className='progress' size={20} />
            <p>{message}</p>
        </div>
    )
}

export default CircularProgressWithLabel