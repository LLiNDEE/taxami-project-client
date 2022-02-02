import React, { createContext, useContext, useEffect, useState } from 'react';

import Header from '../components/header/Header'
import Modal from '../components/Modal/Modal'
import TakeTaskForm from '../components/TakeTaskForm';
import useUserData from '../api/useUserData'
import useUserBuildings from '../api/useUserBuildings';
import useTaskComplete from '../api/useTaskComplete';
import useUserLeaveTask from '../api/useUserLeaveTask';
import useBoolean from '../hooks/useBoolean'
import { useGlobal } from './GlobalProvider';

const contextData = createContext({})

const DataProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA } = useUserData()
    const { execute: getBuildings, isSuccess: isBuildingSuccess, data: buildingsData } = useUserBuildings()
    const { execute: markTaskAsComplete, isSuccess: isTaskCompleted, data: taskCompleted, isError: errorMarkingTaskComplete } = useTaskComplete()
    const { execute: leaveTask, isSuccess: leaveTaskSuccess, data: leaveTaskData, isError: leaveTaskError } = useUserLeaveTask()

    const [buildings, setBuildings] = useState(undefined)
    const [myTasks, setMyTasks] = useState(undefined)

    const [isDataLoading, { set: setIsDataLoading }] = useBoolean(false)

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

        getTasks()
        getBuildings()
        
    },[isTaskCompleted])

    useEffect(() => {
        if(!leaveTaskSuccess) return

        getTasks()

    },[leaveTaskSuccess])

  return (
      <contextData.Provider value={{ buildings, setBuildings, myTasks, setMyTasks, isDataLoading, markTaskAsComplete, leaveTask }}>
          <Header/>
          <Modal
            variant="yesNO"
            modalTitle="Antag uppgift"
            acceptFunc={() => alert("Accepting...")}
          />
          {children}
      </contextData.Provider>
  );
};

export const useData = () => useContext(contextData)

export default DataProvider;


