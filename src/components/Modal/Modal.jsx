import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import './Modal.scss'

import { clsx } from '../../utils/utils'

const VARIANTS = {
    yesNO: 'yesNO',
}

const Modal = ({ modalTitle, yesText, noText, cancelFunc, acceptFunc, content, variant = "yesNO" }) => {


    return (
        <div className="modal">
            {modalTitle && <h2 className="modalTitle">{modalTitle}</h2>}
            {content && content}
            {variant === VARIANTS.yesNO && 
                <div className="buttons">
                    <p className="iconWithText cancelIcon" onClick={cancelFunc}><CancelIcon/> Avbryt</p>
                    <p className="iconWithText acceptIcon" onClick={acceptFunc} ><CheckCircleIcon/> Antag</p>
                </div>
            }
        </div>
    )
}

export default Modal

