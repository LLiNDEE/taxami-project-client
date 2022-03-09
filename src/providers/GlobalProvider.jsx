import React, { createContext, useContext, useEffect, useState } from 'react'

import Menu from '../components/Menu/Menu'
import ViewTaskModal from '../components/Modals/ViewTask/ViewTaskModal'
import ViewInProgressTask from '../components/Modals/ViewInProgressTask/ViewInProgressTask'
import JoinBuildingModal from '../components/Modals/JoinBuilding/JoinBuildingModal'
import Snackbar from '../components/Snackbar/Snackbar'
import useBoolean from '../hooks/useBoolean'
import useModal from '../hooks/useModal'
import useBreakpoint from '../hooks/useBreakpoint'
import MenuProvider from './MenuProvider'
import { AUTH_STATUSES } from '../utils/constants'


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
    const [refreshPage, setRefreshPage] = useState(false)

    const { showVariant: showModalVariant, hideVariant: hideModal, variant: modalVariant, status: modalStatus, data: modalData, setData: setModalData } = useModal()

    const [takeTaskDetails, setTakeTaskDetails] = useState(initialTakeTaskDetails)

    const [userID, setUserID] = useState(undefined)
    const [userData, setUserData] = useState(undefined)
    const [userRole, setUserRole] = useState(undefined)

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus, isPageLoading, refreshPage, setRefreshPage, setPageLoading, setUserID, userID, setUserRole, userRole, setUserData, userData, showModalVariant, hideModal, modalVariant, modalStatus, setModalData, modalData, setTakeTaskDetails, takeTaskDetails }}>
            <div className="page">
                {isPageLoading && <div className="pageCoverDiv"></div>}
                
                { modalVariant === 'joinBuilding' && <JoinBuildingModal/> }
                { modalVariant === 'viewTask' && <ViewTaskModal/>}
                { modalVariant === 'viewInProgressTask' && <ViewInProgressTask/>}

                {children}
                {authStatus === AUTH_STATUSES.loggedIn && userID && userData && !sm && <Snackbar initial={true} message={`Välkommen, ${userData.first_name}!`} />}
            </div>
            <MenuProvider>
                {authStatus !== AUTH_STATUSES.idle && sm && <Menu/>}
            </MenuProvider>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider