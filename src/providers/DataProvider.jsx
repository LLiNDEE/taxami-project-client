import React, { createContext, useContext, useEffect, useState } from 'react';

import Header from '../components/header/Header'
import Modal from '../components/Modal/Modal'
import TakeTaskForm from '../components/TakeTaskForm/TakeTaskForm';
import useUserData from '../api/useUserData'
import useUserBuildings from '../api/useUserBuildings';
import useTaskComplete from '../api/useTaskComplete';
import useUserTakeTask from '../api/useUserTakeTask'
import useUserLeaveTask from '../api/useUserLeaveTask';
import useBoolean from '../hooks/useBoolean'
import { useGlobal } from './GlobalProvider';

const contextData = createContext({})

const initialTakeTaskDetails = {
    estimated_cost: "",
    estimated_time: "",
    optional_comment: "",
}

const DataProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA } = useUserData()
    const { execute: getBuildings, isSuccess: isBuildingSuccess, data: buildingsData } = useUserBuildings()
    const { execute: markTaskAsComplete, isSuccess: isTaskCompleted, data: taskCompleted, isError: errorMarkingTaskComplete } = useTaskComplete()
    const { execute: leaveTask, isSuccess: leaveTaskSuccess, data: leaveTaskData, isError: leaveTaskError } = useUserLeaveTask()
    const { execute: takeTask, iSuccess: takeTaskSuccess, data: takeTaskData, isError: takeTaskError } = useUserTakeTask()

    const [buildings, setBuildings] = useState(undefined)
    const [myTasks, setMyTasks] = useState(undefined)

    const [isTakeTaskModalVisible, { on: showTakeTaskModal, off: hideTakeTaskModal }] = useBoolean(false)

    const [isDataLoading, { set: setIsDataLoading }] = useBoolean(false)

    const [selectedTaskID, setSelectedTaskID] = useState(undefined)
    const [selectedBuildingID, setSelectedBuildingID] = useState(undefined)

    const [takeTaskDetails, setTakeTaskDetails] = useState(initialTakeTaskDetails)

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
        
    },[isTaskCompleted])

    useEffect(() => {
        if(!leaveTaskSuccess) return

        getTasks({user_id: userID})

    },[leaveTaskSuccess])

    useEffect(() => {
        if(!takeTaskData) return

        getTasks({user_id: userID})
        hideTakeTaskModal()
        setRefreshPage(true)
    },[takeTaskData])

  return (
      <contextData.Provider value={{ buildings, setBuildings, myTasks, setMyTasks, isDataLoading, markTaskAsComplete, leaveTask, showTakeTaskModal, setSelectedTaskID, setSelectedBuildingID, setRefreshPage, refreshPage }}>
          <Header/>
          {isTakeTaskModalVisible && <div className="dataProviderPageCover" onClick={hideTakeTaskModal} ></div>}
          {isTakeTaskModalVisible && 
            <Modal
                variant="yesNO"
                modalTitle="Antag uppgift"
                content={<TakeTaskForm takeTaskDetails={takeTaskDetails} setTakeTaskDetails={setTakeTaskDetails}/>}
                acceptFunc={() => takeTask({user_id: userID, building_id: selectedBuildingID, task_id: selectedTaskID, ...takeTaskDetails})}
                cancelFunc={() => hideTakeTaskModal()}
            />   
          }

          {children}
      </contextData.Provider>
  );
};

export const useData = () => useContext(contextData)

export default DataProvider;


