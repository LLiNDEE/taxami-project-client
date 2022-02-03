import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import Modal from '../../core/Modal/Modal'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import AddTaskForm from '../../AddTaskForm/AddTaskForm';

const schema = yup.object().shape({
    title: yup.string().min(5).required(),
    priority: yup.string().min(3).required(),
    description: yup.string().required()
})

const AddTaskModal = () => {

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const { userID } = useGlobal()
    const { selectedBuildingID, addTask, hideModal } = useData()

    const addTaskSubmit = data => addTask({user_id: userID, building_id: selectedBuildingID, ...data})

    return (
        <Modal
            variant="default"
            modalTitle="Lägg till uppgift"
            content={<AddTaskForm onSubmitFunc={handleSubmit(addTaskSubmit)} control={control} errors={errors} cancelFunc={() => hideModal()} />}
        /> 
    );
};

export default AddTaskModal;
