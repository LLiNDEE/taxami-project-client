import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const LeaveTaskModal = () => {

    const { userID } = useGlobal()
    const {selectedTaskID, hideModal, leaveTask } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Är du säker på att du vill lämna den här uppgiften?"
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => leaveTask({user_id: userID, task_id: selectedTaskID})}
    /> 
  );
};

export default LeaveTaskModal;
