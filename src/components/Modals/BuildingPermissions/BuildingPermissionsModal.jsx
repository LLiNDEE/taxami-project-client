import React, { useState } from 'react';

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import TransferList from '../../TransferList/TransferList';
import Flex from '../../core/Flex/Flex';
import TransferPermissions from '../../TransferList/TransferPermissions/TransferPermissions';


const BuildingPermissions = () => {

    const { userID } = useGlobal()
    const { hideModal, modalData } = useData()

  return (
    <Modal
        variant="default"
        modalTitle="Behörigheter"
        content={
            <>
            <Flex justify="center">
                <p style={{ marginBottom: "0.5rem" }}>Välj vilka behörigheter <span className="bold">{modalData.member.first_name}</span> ska ha</p>
            </Flex>
            <TransferPermissions hideModal={hideModal} member_id={modalData.member._id} permissions={modalData.permissions} />
            </>
        }
    /> 
  );
};

export default BuildingPermissions;
