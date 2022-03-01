import React, { createContext, useContext, useEffect, useState } from 'react'

import Menu from '../components/Menu/Menu'
import useBoolean from '../hooks/useBoolean'
import { AUTH_STATUSES } from '../utils/constants'

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(AUTH_STATUSES.idle)
    const [isPageLoading, { set: setPageLoading }] = useBoolean()

    const [userID, setUserID] = useState(undefined)
    const [userRole, setUserRole] = useState(undefined)

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus, isPageLoading, setPageLoading, setUserID, userID, setUserRole, userRole }}>
            <div className="page">
                {isPageLoading && <div className="pageCoverDiv"></div>}
                {children}
            </div>
            <Menu/>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider