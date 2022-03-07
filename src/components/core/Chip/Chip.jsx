import React from 'react'
import Avatar from '@mui/material/Avatar'
import MuiChip from '@mui/material/Chip'

const Chip = ({ labelText, ...props }) => {
  return (
    <MuiChip
      sx={{ backgroundColor: "#396D8D", color: "white", cursor: "pointer", userSelect: "none" }}
      avatar={<Avatar></Avatar>} 
      label={labelText} 
      {...props} 
    />
  )
}

export default Chip