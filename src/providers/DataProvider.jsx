import React, { createContext, useContext, useEffect, useState } from 'react';

import useUserData from '../api/useUserData'
import useUserBuildings from '../api/useUserBuildings';
import useBoolean from '../hooks/useBoolean'
import { useGlobal } from './GlobalProvider';

const contextData = createContext({})

const DataProvider = ({ children }) => {

    const { userID } = useGlobal()

    const { execute: getTasks, isSuccess: isTaskSuccess, status, data: tasksDATA } = useUserData()
    const { execute: getBuildings, isSuccess: isBuildingSuccess, data: buildingsData } = useUserBuildings()

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

  return (
      <contextData.Provider value={{ buildings, setBuildings, myTasks, setMyTasks, isDataLoading }}>
          {children}
      </contextData.Provider>
  );
};

export const useData = () => useContext(contextData)

export default DataProvider;


