import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const LeaveBuildingModal = () => {

    const { userID } = useGlobal()
    const {selectedBuildingID, hideModal, leaveBuilding } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Är du säker på att du vill lämna byggnaden?"
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => leaveBuilding({user_id: userID, building_id: selectedBuildingID, member_id: userID})}
    /> 
  );
};

export default LeaveBuildingModal;
