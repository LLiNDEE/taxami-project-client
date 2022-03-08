import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import Input from '../../core/Input/Input';
import LeaveBuildingForm from '../../LeaveBuildingForm/LeaveBuildingForm';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const LeaveBuildingModal = () => {

    const { userID } = useGlobal()
    const {selectedBuilding, hideModal, leaveBuilding } = useData()
    
    const [disabled, setDisabled] = useState(true)

  return (
    <Modal
        variant="yesNO"
        modalTitle="Lämna"
        content={<LeaveBuildingForm buildingName={selectedBuilding.building_name} setDisabled={setDisabled} />}
        yesText="Ja"
        disabled={disabled}
        acceptDisabledText="Fyll i fältet för att fortsätta"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        // acceptFunc={() => leaveBuilding({user_id: userID, building_id: selectedBuilding.building_id, member_id: userID})}
        acceptFunc={() => console.log("lämnar byggnad....")}
    /> 
  );
};

export default LeaveBuildingModal;
