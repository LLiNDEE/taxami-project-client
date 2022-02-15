import React, { useState } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Chip from '@mui/material/Chip';

import './GenerateCode.scss'

import Input from '../../core/Input/Input'
import { useAdmin } from '../../../providers/AdminProvider';
import { useGlobal } from '../../../providers/GlobalProvider'
import { useEffect } from 'react';

const GenerateCode = () => {

    const { subscriptionCode, generateCode } = useAdmin()
    const { userID } = useGlobal()

    const [prefix, setPrefix] = useState("")
    const [isCodeCopied, setIsCodeCopied] = useState(undefined)

    useEffect(() => {
        if(!isCodeCopied) return

        setTimeout(() => {
            setIsCodeCopied(false)
        },1000)

    },[isCodeCopied])

  return (
    <div className="generateCodeContainer">
        <div className="container">
            <h4>Generera en kod</h4>
            <div className="codeInputContainer">
                <Input 
                    className="prefixInput" 
                    name="prefix" 
                    label="Prefix"
                    value={prefix}
                    onChange={e => setPrefix(e.target.value)}
                />
                <Input 
                    id="outlined-read-only-input" 
                    className="codeInput" 
                    name="code" 
                    value={subscriptionCode ? subscriptionCode : "Prenumerationskod"} 
                    label="Prenumerationskod" 
                    readOnly
                />
                <button 
                    className="button"
                    onClick={() => generateCode({user_id: userID, type: 'subscription', ...prefix ? {prefix: prefix} : null})}
                >
                    <AutorenewIcon/>
                </button>
                <button 
                    className="button"
                    onClick={() => (navigator.clipboard.writeText(subscriptionCode), setIsCodeCopied(true))}
                >
                    <ContentCopyIcon/>
                </button>
            </div>
            <div className="copiedChipContainer">
                    {isCodeCopied && <Chip label="Kopierad" color="success"/>}
            </div>
        </div>
    </div>
  )
}

export default GenerateCode