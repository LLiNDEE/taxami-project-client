import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const LeaveBuildingModal = () => {

    const { userID } = useGlobal()
    const {selectedBuilding, hideModal, leaveBuilding } = useData()
    
    const [disabled, setDisabled] = useState(undefined)

  return (
    <Modal
        variant="yesNO"
        modalTitle="Lämna"
        content={<p>Du försöker lämna byggnaden med namnet <span className="bold">{selectedBuilding.building_name}</span></p>}
        yesText="Ja"
        disabled={true}
        acceptDisabledText="Fyll i fältet för att fortsätta"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        // acceptFunc={() => leaveBuilding({user_id: userID, building_id: selectedBuilding.building_id, member_id: userID})}
        acceptFunc={() => console.log("lämnar byggnad....")}
    /> 
  );
};

export default LeaveBuildingModal;
