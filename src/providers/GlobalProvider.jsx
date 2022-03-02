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

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const { sm } = useBreakpoint()

    const [authStatus, setAuthStatus] = useState(AUTH_STATUSES.idle)
    const [isPageLoading, { set: setPageLoading }] = useBoolean()

    const { showVariant: showModalVariant, hideVariant: hideModal, variant: modalVariant, status: modalStatus } = useModal()

    const [userID, setUserID] = useState(undefined)
    const [userRole, setUserRole] = useState(undefined)

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus, isPageLoading, setPageLoading, setUserID, userID, setUserRole, userRole, showModalVariant, hideModal, modalVariant, modalStatus }}>
            <div className="page">
                {isPageLoading && <div className="pageCoverDiv"></div>}

                { modalStatus === 'SHOWN' && <div className="dataProviderPageCover" onClick={hideModal} ></div>}
                { modalVariant === 'takeTask' && <TakeTaskModal/>}
                { modalVariant === 'leaveTask' && <LeaveTaskModal/>}
                { modalVariant === 'completeTask' && <CompleteTaskModal/>}
                { modalVariant === 'removeCompletedTask' && <TaskRemoveCompletedModal/> }
                { modalVariant === 'addTask' && <AddTaskModal/> }
                { modalVariant === 'removeTask' && <RemoveTaskModal/> }
                { modalVariant === 'leaveBuilding' && <LeaveBuildingModal/>}
                { modalVariant === 'createBuilding' && <CreateBuildingModal/> }
                { modalVariant === 'joinBuilding' && <JoinBuildingModal/> }

                {children}
            </div>
            {sm && <Menu/>}
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider