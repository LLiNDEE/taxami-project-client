import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import Flex from '../../core/Flex/Flex'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const LeaveTaskModal = () => {

    const { userID } = useGlobal()
    const { selectedTaskID, hideModal, markTaskAsComplete } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Klarmarkera"
        content={<Flex justify="left">Är du säker på att du vill klarmarkera uppgiften?</Flex>}
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => markTaskAsComplete({user_id: userID, task_id: selectedTaskID})}
    /> 
  );
};

export default LeaveTaskModal;
