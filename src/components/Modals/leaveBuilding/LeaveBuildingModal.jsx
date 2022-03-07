import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const LeaveBuildingModal = () => {

    const { userID } = useGlobal()
    const {selectedBuilding, hideModal, leaveBuilding } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Lämna"
        content={<p>Du försöker lämna byggnaden med namnet {selectedBuilding.building_name}</p>}
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => leaveBuilding({user_id: userID, building_id: selectedBuilding.building_id, member_id: userID})}
    /> 
  );
};

export default LeaveBuildingModal;
