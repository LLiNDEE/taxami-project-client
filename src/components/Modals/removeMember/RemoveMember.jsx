import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';


const RemoveMember = () => {

    const { userID } = useGlobal()
    const {selectedTaskID, hideModal, selectedBuilding, removeMember, modalData } = useData()
    

  return (
    <Modal
        variant="yesNO"
        modalTitle="Ta bort"
        content={
            <p>Är du säker på att du vill ta bort den här användaren?</p>
        }
        yesText="Ja"
        noText="Avbryt"
        cancelFunc={() => hideModal()}
        acceptFunc={() => RemoveMember({user_id: userID, member_id: modalData, building_id: selectedBuilding.building_id})}
    /> 
  );
};

export default RemoveMember;
