import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import './Modal.scss'

import { clsx } from '../../../utils/utils'

const VARIANTS = {
    noButton: 'noButton',
    yesNO: 'yesNO',
    default: 'default',
}

const Modal = ({ modalTitle, yesText, noText, cancelFunc, acceptFunc, content, variant = "yesNO", disabled, acceptDisabledText, cancelDisabledText }) => {


    return (
        <div className="modal">
            {modalTitle && <h2 className="modalTitle">{modalTitle}</h2>}
            {content && content}
            {variant === VARIANTS.noButton &&
                <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/>{noText ?? "Avbryt"}</p>
            }
            {variant === VARIANTS.yesNO && 
                <div className="buttons">
                    <p className="iconWithText cancelIcon" onClick={cancelFunc}>
                        {disabled && cancelDisabledText ?
                            <Tooltip title={cancelDisabledText} className="iconWithText cancelIcon">
                                <IconButton sx={{height: "1rem", fontSize: "1.2rem"}}>
                                    <CancelIcon sx={{ fontSize: "1.5rem" }}/>{noText ?? "Avbryt"}
                                </IconButton>
                            </Tooltip>
                        :
                            <>
                                <CancelIcon sx={{ fontSize: "1.5rem" }}/>{noText ?? "Avbryt"}
                            </>
                        }
                    </p>
                    <p className="iconWithText acceptIcon" {...(!disabled ? {onClick:acceptFunc} : null)} >
                        {disabled && acceptDisabledText ?
                            <Tooltip title={acceptDisabledText} className="iconWithText ">
                                <IconButton sx={{height: "1rem", fontSize: "1.2rem"}}>
                                    <CheckCircleIcon sx={{fontSize: "1.5rem"}}/> {yesText ?? "Antag"}
                                </IconButton>
                            </Tooltip>
                        :
                            <>
                                <CheckCircleIcon/> {yesText ?? "Antag"}
                            </>
                        }
                    </p>
                </div>
            }
        </div>
    )
}

export default Modal

