import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import TakeTaskForm from '../../TakeTaskForm/TakeTaskForm';
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';

const initialTakeTaskDetails = {
    estimated_cost: "",
    estimated_time: "",
    optional_comment: "",
}

const TakeTaskModal = () => {

    const { userID } = useGlobal()
    const { selectedBuilding, selectedTaskID, hideModal, takeTask } = useData()

    const [data, setData] = useState(initialTakeTaskDetails)
    


  return (
    <Modal
        variant="yesNO"
        modalTitle="Antag uppgift"
        content={<TakeTaskForm data={data} setData={setData}/>}
        acceptFunc={() => takeTask({user_id: userID, building_id: selectedBuilding.building_id, task_id: selectedTaskID, ...data})}
        cancelFunc={() => hideModal()}
    />   
  );
};

export default TakeTaskModal;
