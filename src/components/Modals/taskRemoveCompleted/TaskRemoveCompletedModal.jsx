import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const TaskRemoveCompletedModal = () => {

    const { userID } = useGlobal()
    const { selectedTaskID, hideModal, updateTask  } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Ta bort klarmarkeringen"
        content={<p>Genom att ta bort klarmarkeringen kommer statusen att ändras till Pågående.</p>}
        yesText="Ta bort klarmarkering"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => updateTask({user_id: userID, task_id: selectedTaskID, status: 'inProgress'})}
    /> 
  );
};

export default TaskRemoveCompletedModal;
