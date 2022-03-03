import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const ViewTaskModal = () => {

  return (
    <Modal
        variant="default"
        modalTitle="<--- TASK --->"
        content={<p>Här visas task</p>}
    /> 
  );
};

export default ViewTaskModal;
