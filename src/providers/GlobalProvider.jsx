import React, { createContext, useContext, useEffect, useState } from 'react'

import Menu from '../components/Menu/Menu'
import TakeTaskModal from '../components/Modals/takeTask/TakeTaskModal'
import LeaveTaskModal from '../components/Modals/leaveTask/LeaveTaskModal'
import CompleteTaskModal from '../components/Modals/completeTask/CompleteTaskModal'
import TaskRemoveCompletedModal from '../components/Modals/taskRemoveCompleted/TaskRemoveCompletedModal'
import AddTaskModal from '../components/Modals/addTask/AddTaskModal'
import RemoveTaskModal from '../components/Modals/removeTask/RemoveTaskModal'
import LeaveBuildingModal from '../components/Modals/leaveBuilding/LeaveBuildingModal'
import CreateBuildingModal from '../components/Modals/createBuilding/CreateBuildingModal'
import JoinBuildingModal from '../components/Modals/JoinBuilding/JoinBuildingModal'
import useBoolean from '../hooks/useBoolean'
import useModal from '../hooks/useModal'
import useBreakpoint from '../hooks/useBreakpoint'
import { AUTH_STATUSES } from '../utils/constants'
import ViewTaskModal from '../components/Modals/ViewTask/ViewTaskModal'

import MenuProvider from './MenuProvider'

const initialTakeTaskDetails = {
    building_id: "",
    task_id: "",
    estimated_cost: "",
    estimated_time: "",
    optional_comment: "",
}

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const { sm } = useBreakpoint()

    const [authStatus, setAuthStatus] = useState(AUTH_STATUSES.idle)
    const [isPageLoading, { set: setPageLoading }] = useBoolean()

    const { showVariant: showModalVariant, hideVariant: hideModal, variant: modalVariant, status: modalStatus, data: modalData, setData: setModalData } = useModal()

    const [takeTaskDetails, setTakeTaskDetails] = useState(initialTakeTaskDetails)

    const [userID, setUserID] = useState(undefined)
    const [userRole, setUserRole] = useState(undefined)

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus, isPageLoading, setPageLoading, setUserID, userID, setUserRole, userRole, showModalVariant, hideModal, modalVariant, modalStatus, setModalData, modalData, setTakeTaskDetails, takeTaskDetails }}>
            <div className="page">
                {isPageLoading && <div className="pageCoverDiv"></div>}
                
                { modalVariant === 'joinBuilding' && <JoinBuildingModal/> }
                { modalVariant === 'viewTask' && <ViewTaskModal/>}

                {children}
                
            </div>
            <MenuProvider>
                {authStatus !== AUTH_STATUSES.idle && sm && <Menu/>}
            </MenuProvider>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider