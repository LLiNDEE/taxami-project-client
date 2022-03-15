import React, { useEffect, useState, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import Modal from '../../core/Modal/Modal'
import useDebounce from '../../../hooks/useDebounce'
import { useGlobal } from '../../../providers/GlobalProvider';
import { useData } from '../../../providers/DataProvider';
import AddTaskForm from '../../AddTaskForm/AddTaskForm';
import useBreakpoint from '../../../hooks/useBreakpoint';

const schema = yup.object().shape({
    title: yup.string().min(5).required(),
    priority: yup.string().min(3).required(),
    description: yup.string().required()
})

const AddTaskModal = () => {

    const { sm } = useBreakpoint()

    const [data, setData] = useState(undefined)

    const { setModalData } = useGlobal()

    const { handleSubmit, watch, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    
    const { userID } = useGlobal()
    const { selectedBuilding, addTask, hideModal } = useData()
    
    const addTaskSubmit = data => {
        if(!sm) addTask({user_id: userID, building_id: selectedBuilding.building_id, ...data})
    }

    const title = useWatch({control, name: "title"})
    const priority = useWatch({control, name: "priority"})
    const description = useWatch({control, name: "description"})

    const debouncedData = useDebounce(data, 500)

    useEffect(() => {
        sm && setData({title: title, priority: priority, description: description})
    },[title, priority, description])

    useEffect(() => {
        if(!debouncedData) return

        sm && setModalData({...debouncedData, user_id: userID, building_id: selectedBuilding.building_id})

    },[debouncedData])

    return (
        <Modal
            variant="default"
            modalTitle="Lägg till uppgift"
            content={<AddTaskForm onSubmitFunc={handleSubmit(addTaskSubmit)} control={control} errors={errors} cancelFunc={() => hideModal()} />}
        /> 
    );
};

export default AddTaskModal;
