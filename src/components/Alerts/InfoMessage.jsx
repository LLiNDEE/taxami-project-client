import React from 'react'
import { Alert } from '@mui/material'

const InfoMessage = ({message}) => {
  return (
    <Alert severity="info">{message}</Alert>
  )
}

export default InfoMessage