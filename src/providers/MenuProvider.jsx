import React, { useState, useEffect, useContext, createContext } from 'react'

const contextMenu = createContext({})

const MenuProvider = ({ children }) => {

    /**
     * Lägg till api-hooks här
     * Eventuellt göra en provider som håller all api-hooks
     */

    return (
        <contextMenu.Provider value={{}}>
            {children}
        </contextMenu.Provider>
    )
}


export const useMenu = () => useContext(contextMenu)

export default MenuProvider


