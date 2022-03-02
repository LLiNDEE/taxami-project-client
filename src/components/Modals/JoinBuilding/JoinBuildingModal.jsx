import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import JoinBuildingForm from '../../joinBuildingForm/JoinBuildingForm';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const JoinBuildingModal = () => {

    return (
        <Modal
            variant="default"
            modalTitle="Gå med i byggnad"
            content={<JoinBuildingForm/>}
        />
    )

};

export default JoinBuildingModal;