import React, { createContext, useContext, useEffect, useState } from 'react';

import Header from '../components/header/Header'
import LeaveTaskModal from '../components/Modals/leaveTask/LeaveTaskModal';
import TakeTaskModal from '../components/Modals/takeTask/TakeTaskModal';
import TaskRemoveCompletedModal from '../components/Modals/taskRemoveCompleted/TaskRemoveCompletedModal';
import CompleteTaskModal from '../components/Modals/completeTask/CompleteTaskModal'
import AddTaskModal from '../components/Modals/addTask/AddTaskModal';
import RemoveTaskModal from '../components/Modals/removeTask/RemoveTaskModal';
import useUserData from '../api/useUserData'
import useUserBuildings from '../api/useUserBuildings';
import useTaskComplete from '../api/useTaskComplete';
import useUserTakeTask from '../api/useUserTakeTask';
import useModal from '../hooks/useModal'
import useTaskUpdate from '../api/useTaskUpdate';
import useRemoveTask from '../api/useRemoveTask'
import useUserLeaveTask from '../api/useUserLeaveTask';
import useAddTask from '../api/useAddTask'
import useBoolean from '../hooks/useBoolean'
import { useGlobal } from './GlobalProvider';

const contextData = createContext({})

const DataProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA } = useUserData()
    const { execute: getBuildings, isSuccess: isBuildingSuccess, data: buildingsData } = useUserBuildings()
    const { execute: markTaskAsComplete, isSuccess: isTaskCompleted, data: taskCompleted, isError: errorMarkingTaskComplete } = useTaskComplete()
    const { execute: leaveTask, isSuccess: leaveTaskSuccess, data: leaveTaskData, isError: leaveTaskError } = useUserLeaveTask()
    const { execute: takeTask, iSuccess: takeTaskSuccess, data: takeTaskData, isError: takeTaskError } = useUserTakeTask()
    const { execute: updateTask, isSuccess: updateTaskSuccess, data: updateTaskData, isError: updateTaskError } = useTaskUpdate()
    const { execute: addTask, isSuccess: addTaskSuccess } = useAddTask()
    const { execute: removeTask, isSuccess: removeTaskSuccess } = useRemoveTask()

    const { showVariant: showModalVariant, hideVariant: hideModal, variant: modalVariant, status: modalStatus } = useModal()

    const [buildings, setBuildings] = useState(undefined)
    const [myTasks, setMyTasks] = useState(undefined)

    const [isDataLoading, { set: setIsDataLoading }] = useBoolean(false)

    const [selectedTaskID, setSelectedTaskID] = useState(undefined)
    const [selectedBuildingID, setSelectedBuildingID] = useState(undefined)

    const [refreshPage, setRefreshPage] = useState(false)

    useEffect(() => {
        if(!tasksDATA || !buildingsData) return

        setMyTasks(tasksDATA.data.tasks)
        setBuildings(buildingsData.data.buildings)

        setIsDataLoading(false)

    },[tasksDATA, buildingsData])

    useEffect(() => {

        if(!userID) return

        setIsDataLoading(true)

        getTasks({user_id: userID})
        getBuildings({user_id: userID})

    },[])

    useEffect(() => {
        if(!isTaskCompleted) return

        getTasks({user_id: userID})
        getBuildings({user_id: userID})
        hideModal()
        setRefreshPage(true)
        
    },[isTaskCompleted])

    useEffect(() => {
        if(!leaveTaskSuccess) return

        getTasks({user_id: userID})
        hideModal()
        setRefreshPage(true)

    },[leaveTaskSuccess])

    useEffect(() => {
        if(!takeTaskData) return

        getTasks({user_id: userID})
        hideModal()
        setRefreshPage(true)
    },[takeTaskData])

    useEffect(() => {
        if(!updateTaskData) return

        getTasks({user_id: userID})
        hideModal()
        setRefreshPage(true)

    },[updateTaskData])

    useEffect(() => {
        if(!addTaskSuccess) return

        hideModal()
        setRefreshPage(true)

    },[addTaskSuccess])

    useEffect(() => {
        if(!removeTaskSuccess) return

        hideModal()
        setRefreshPage(true)

    },[removeTaskSuccess])

  return (
      <contextData.Provider value={{ buildings, setBuildings, myTasks, setMyTasks, isDataLoading, markTaskAsComplete, setSelectedTaskID, setSelectedBuildingID, selectedBuildingID, selectedTaskID, setRefreshPage, refreshPage, hideModal, showModalVariant, leaveTask, takeTask, updateTask, addTask, removeTask }}>
          <Header/>
            { modalStatus === 'SHOWN' && <div className="dataProviderPageCover" onClick={hideModal} ></div>}
            { modalVariant === 'takeTask' && <TakeTaskModal/>}
            { modalVariant === 'leaveTask' && <LeaveTaskModal/>}
            { modalVariant === 'completeTask' && <CompleteTaskModal/>}
            { modalVariant === 'removeCompletedTask' && <TaskRemoveCompletedModal/> }
            { modalVariant === 'addTask' && <AddTaskModal/> }
            { modalVariant === 'removeTask' && <RemoveTaskModal/> }

          {children}
      </contextData.Provider>
  );
};

export const useData = () => useContext(contextData)

export default DataProvider;


