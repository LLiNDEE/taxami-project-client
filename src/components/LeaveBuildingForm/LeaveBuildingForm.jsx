import React, { useState } from 'react'

import './LeaveBuildingForm.scss'

import Input from '../core/Input/Input'
import Flex from '../core/Flex/Flex'

const LeaveBuildingForm = ({ buildingName, setDisabled }) => {

    const [input, setInput] = useState("")

    const handleChange = e => {
        const text = e.target.value
        if(text === buildingName) setDisabled(false)
        else setDisabled(true)
        setInput(text)
    }

  return (
    <div className="leaveBuildingForm">
        <p>Du försöker lämna byggnaden med namnet <span className="bold">{buildingName}</span></p>
        <p>Skriv in namnet på byggnaden för att lämna</p>
        <Flex justify="center">
            <Input label="Husnamn" value={input} onChange={handleChange} />
        </Flex>
    </div>
  )
}

export default LeaveBuildingForm