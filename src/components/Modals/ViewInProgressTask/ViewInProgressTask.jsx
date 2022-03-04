import React from 'react'

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider'

const ViewInProgressTask = () => {

    const { modalData } = useGlobal()

    return (
        <Modal
            variant="default"
            modalTitle={modalData.title}
            content={
                <div>
                    <p>Förväntad kostnad: {modalData.details.estimated_cost} kronor.</p>
                    <p>Förväntad tid: {modalData.details.estimated_time} minuter.</p>
                    <p>Beskrivning: {modalData.description}</p>
                </div>
            }
        />
    )
}

export default ViewInProgressTask