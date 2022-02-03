import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './Modal.scss'

import { clsx } from '../../../utils/utils'

const VARIANTS = {
    noButton: 'noButton',
    yesNO: 'yesNO',
    default: 'default',
}

const Modal = ({ modalTitle, yesText, noText, cancelFunc, acceptFunc, content, variant = "yesNO" }) => {


    return (
        <div className="modal">
            {modalTitle && <h2 className="modalTitle">{modalTitle}</h2>}
            {content && content}
            {variant === VARIANTS.noButton &&
                <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/>{noText ?? "Avbryt"}</p>
            }
            {variant === VARIANTS.yesNO && 
                <div className="buttons">
                    <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/>{noText ?? "Avbryt"}</p>
                    <p className="iconWithText acceptIcon" onClick={acceptFunc} ><CheckCircleIcon/> {yesText ?? "Antag"}</p>
                </div>
            }
        </div>
    )
}

export default Modal

