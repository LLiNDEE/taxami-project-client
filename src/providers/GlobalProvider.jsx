import React, { createContext, useContext, useState } from 'react'

const contextGlobal = createContext({})

const GlobalProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(undefined)

    return (
        <contextGlobal.Provider value={{}}>
            <div className="page">
                {children}
            </div>
        </contextGlobal.Provider>
    )
}

export const useGlobal = () => useContext(contextGlobal)

export default GlobalProvider