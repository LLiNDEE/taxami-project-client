import React, { createContext, useContext, useEffect, useState } from 'react';

import Header from '../components/header/Header'
import LeaveTaskModal from '../components/Modals/leaveTask/LeaveTaskModal';
import TakeTaskModal from '../components/Modals/takeTask/TakeTaskModal';
import TaskRemoveCompletedModal from '../components/Modals/taskRemoveCompleted/TaskRemoveCompletedModal';
import CompleteTaskModal from '../components/Modals/completeTask/CompleteTaskModal'
import AddTaskModal from '../components/Modals/addTask/AddTaskModal';
import CreateBuildingModal from '../components/Modals/createBuilding/CreateBuildingModal';
import RemoveTaskModal from '../components/Modals/removeTask/RemoveTaskModal';
import LeaveBuildingModal from '../components/Modals/leaveBuilding/LeaveBuildingModal'
import RemoveMember from '../components/Modals/removeMember/RemoveMember';
import BuildingPermissions from '../components/Modals/BuildingPermissions/BuildingPermissionsModal';
import Snackbar from '../components/Snackbar/Snackbar';
import useUserData from '../api/useUserData'
import useUserBuildings from '../api/useUserBuildings';
import useLeaveBuilding from '../api/useLeaveBuilding'
import useTaskComplete from '../api/useTaskComplete';
import useUserTakeTask from '../api/useUserTakeTask';
import useModal from '../hooks/useModal'
import useTaskUpdate from '../api/useTaskUpdate';
import useRemoveTask from '../api/useRemoveTask'
import useBuildingRemoveMember from '../api/useBuildingRemoveMember'
import useAddPermission from '../api/useAddPermission'
import useCreateBuilding from '../api/useCreateBuilding';
import useUserLeaveTask from '../api/useUserLeaveTask';
import useJoinBuilding from '../api/useJoinBuilding'
import useAddTask from '../api/useAddTask'
import useAuth from '../hooks/useAuth';
import useBoolean from '../hooks/useBoolean'
import { useGlobal } from './GlobalProvider';

const selectedBuildingInitialValues = {
    building_id: undefined,
    building_name: undefined,
}

const contextData = createContext({})

const DataProvider = ({ children }) => {

    const { userID, userRole, showModalVariant, hideModal, modalVariant, modalStatus, refreshPage, setRefreshPage, modalData, setModalData } = useGlobal()

    const auth = useAuth()

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA, isError: getTasksError, error: getTasksErrorData } = useUserData()
    const { execute: getBuildings, isSuccess: isBuildingSuccess, data: buildingsData, isError: getBuildingsError, error: getBuildingsErrorData } = useUserBuildings()
    const { execute: markTaskAsComplete, isSuccess: isTaskCompleted, data: taskCompleted, isError: errorMarkingTaskComplete } = useTaskComplete()
    const { execute: leaveTask, isSuccess: leaveTaskSuccess, data: leaveTaskData, isError: leaveTaskError } = useUserLeaveTask()
    const { execute: takeTask, iSuccess: takeTaskSuccess, data: takeTaskData, isError: takeTaskError } = useUserTakeTask()
    const { execute: updateTask, isSuccess: updateTaskSuccess, data: updateTaskData, isError: updateTaskError } = useTaskUpdate()
    const { execute: addTask, isSuccess: addTaskSuccess } = useAddTask()
    const { execute: removeTask, isSuccess: removeTaskSuccess } = useRemoveTask()
    const { execute: joinBuilding, isSuccess: joinBuildingSuccess, isError: joinBuildingError, error: joinBuildingErrorType} = useJoinBuilding()
    const { execute: leaveBuilding, isSuccess: leaveBuildingSuccess } = useLeaveBuilding()
    const { execute: createBuilding, isSuccess: createBuildingSuccess, isError: createBuildingError } = useCreateBuilding()
    const { execute: removeMember, isSuccess: removeMemberSuccess, isError: removeMemberError } = useBuildingRemoveMember()
    
    const { execute: addPermission, isSuccess: addPermissionSuccess, isError: addPermissionError, isLoading: isAddPermissionsLoading } = useAddPermission()

    // const { showVariant: showModalVariant, hideVariant: hideModal, variant: modalVariant, status: modalStatus } = useModal()

    const [buildings, setBuildings] = useState(undefined)
    const [myTasks, setMyTasks] = useState(undefined)

    const [isDataLoading, { set: setIsDataLoading }] = useBoolean(false)

    const [selectedTaskID, setSelectedTaskID] = useState(undefined)
    const [selectedBuilding, setSelectedBuilding] = useState(selectedBuildingInitialValues)

    useEffect(() => {
        if(!getTasksError && !getBuildingsError) return

        if(getBuildingsErrorData?.message === 'authorizationError' || getTasksErrorData?.message === 'authorizationError') auth.logoutUser()

    },[getTasksError, getBuildingsError])
    

    useEffect(() => {

        if(!userID && userRole === 'admin') return

        setIsDataLoading(true)

        getTasks({user_id: userID})
        getBuildings({user_id: userID})

    },[])

    useEffect(() => {
        if(!tasksDATA || !buildingsData) return

        setMyTasks(tasksDATA.data.tasks)
        setBuildings(buildingsData.data.buildings)

        setIsDataLoading(false)

    },[tasksDATA, buildingsData])

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

    useEffect(() => {
        if(!joinBuildingSuccess) return

        getBuildings({user_id: userID})

    },[joinBuildingSuccess])

    useEffect(() => {
        if(!leaveBuildingSuccess) return

        getBuildings({user_id: userID})
        hideModal()

    },[leaveBuildingSuccess])

    useEffect(() => {
        if(!createBuildingSuccess) return

        getBuildings({user_id: userID})
        hideModal()

    },[createBuildingSuccess])

    useEffect(() => {
        if(!removeMemberSuccess) return

        setRefreshPage(true)
        hideModal()

    },[removeMemberSuccess])

    useEffect(() => {
        if(!addPermissionSuccess) return
        
        setRefreshPage(true)
        getBuildings({user_id: userID})

    },[addPermissionSuccess])

  return (
        <contextData.Provider value={{ 
            buildings, setBuildings, myTasks, setMyTasks, isDataLoading, markTaskAsComplete, setSelectedTaskID, setSelectedBuilding, selectedBuilding, 
            selectedTaskID, setRefreshPage, refreshPage, hideModal, showModalVariant, leaveTask, takeTask, updateTask, addTask, removeTask, modalData, 
            joinBuilding, joinBuildingSuccess, leaveBuilding, joinBuildingError, joinBuildingErrorType, createBuilding, removeMember, addPermission, addPermissionSuccess,
            setModalData
        }}>
          <Header/>

            { modalStatus === 'SHOWN' && <div className="dataProviderPageCover" onClick={hideModal} ></div>}
            { modalVariant === 'takeTask' && <TakeTaskModal/>}
            { modalVariant === 'leaveTask' && <LeaveTaskModal/>}
            { modalVariant === 'completeTask' && <CompleteTaskModal/>}
            { modalVariant === 'removeCompletedTask' && <TaskRemoveCompletedModal/> }
            { modalVariant === 'addTask' && <AddTaskModal/> }
            { modalVariant === 'removeTask' && <RemoveTaskModal/> }
            { modalVariant === 'leaveBuilding' && <LeaveBuildingModal/>}
            { modalVariant === 'createBuilding' && <CreateBuildingModal/> }
            { modalVariant === 'removeMember' && <RemoveMember/>}
            { modalVariant === 'buildingPermissions' && <BuildingPermissions/> }

            {children}

            {addPermissionSuccess && <Snackbar initial={true} message="Behörigheterna har blivit uppdaterade" />}

      </contextData.Provider>
  );
};

export const useData = () => useContext(contextData)

export default DataProvider;


