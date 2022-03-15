import React, { useEffect, useState } from 'react';

import Modal from '../../core/Modal/Modal'
import useBreakpoint from '../../../hooks/useBreakpoint'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const LeaveTaskModal = () => {

    const { sm } = useBreakpoint()
    
    const { userID } = useGlobal()
    const {selectedTaskID, hideModal, leaveTask, setModalData } = useData()

    useEffect(() => {
      setModalData({task_id: selectedTaskID})
    },[])
    

  return (
    <Modal
        variant={sm ? "default" : "yesNO"}
        modalTitle="Lämna"
        content={<p>Är du säker på att du vill lämna den här uppgiften?</p>}
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => leaveTask({user_id: userID, task_id: selectedTaskID})}
    /> 
  );
};

export default LeaveTaskModal;
