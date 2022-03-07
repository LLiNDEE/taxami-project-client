import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const RemoveTaskModal = () => {

    const { userID } = useGlobal()
    const {selectedTaskID, hideModal, selectedBuilding, removeTask } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Är du säker på att du vill ta bort den här uppgiften?"
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => removeTask({user_id: userID, building_id: selectedBuilding.building_id, task_id: selectedTaskID})}
    /> 
  );
};

export default RemoveTaskModal;
