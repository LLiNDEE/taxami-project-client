import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import TakeTaskForm from '../../TakeTaskForm/TakeTaskForm';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import { useEffect } from 'react';

const initialTakeTaskDetails = {
  estimated_cost: "",
  estimated_time: "",
  optional_comment: "",
}


const ViewTaskModal = () => {

  const { modalData } = useGlobal()

  const [data, setData] = useState(initialTakeTaskDetails)

  useEffect(() => {
    console.log("modal data--->", modalData)
  },[modalData])

  return (
    <Modal
        variant="default"
        modalTitle={modalData.title}
        content={<TakeTaskForm {...{data, setData}}/>}
    /> 
  );
};

export default ViewTaskModal;
