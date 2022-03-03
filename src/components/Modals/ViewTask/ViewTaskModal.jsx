import React, { useEffect, useState } from 'react';

import Modal from '../../core/Modal/Modal'
import TakeTaskForm from '../../TakeTaskForm/TakeTaskForm';
import { useGlobal } from '../../../providers/GlobalProvider';

const ViewTaskModal = () => {

  const { modalData, takeTaskDetails, setTakeTaskDetails } = useGlobal()

  useEffect(() => {
    if(!modalData) return

    setTakeTaskDetails(v => ({...v, building_id: modalData.building_id, task_id: modalData._id}))

  },[])

  return (
    <Modal
        variant="default"
        modalTitle={modalData.title}
        content={<TakeTaskForm data={takeTaskDetails} setData={setTakeTaskDetails}/>}
    /> 
  );
};

export default ViewTaskModal;
