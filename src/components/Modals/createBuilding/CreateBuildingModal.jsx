import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import CreateBuildingForm from '../../createBuildingForm/CreateBuildingForm';

const Schema = yup.object().shape({
    building_name: yup.string().min(5).required()
})

const CreateBuildingModal = () => {

    const { userID } = useGlobal()
    const { hideModal, createBuilding } = useData()

    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(Schema)
    })

    const createBuildingFunction = data => createBuilding({user_id: userID, ...data})

  return (
    <Modal
        variant="default"
        modalTitle="Skapa ny byggnad"
        content={<CreateBuildingForm onSubmitFunc={handleSubmit(createBuildingFunction)} control={control} errors={errors} cancelFunc={() => hideModal()} />}
    /> 
  );
};

export default CreateBuildingModal;
