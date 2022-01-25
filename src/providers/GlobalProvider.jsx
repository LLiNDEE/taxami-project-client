import React, { createContext, useContext, useState } from 'react'

import { AUTH_STATUSES } from '../utils/constants'

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(AUTH_STATUSES.idle)

    return (
        <contextGlobal.Provider value={{ setAuthStatus, authStatus }}>
            <div className="page">
                {children}
            </div>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider