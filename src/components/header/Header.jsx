import React from 'react'

import './Header.scss'

import useAuth from '../../hooks/useAuth'

const Header = () => {

    const auth = useAuth()

    return (
        <header>
            <h1>Logged in header</h1>
            <button onClick={() => auth.logoutUser()}>Logga ut</button>
        </header>
    )
}

export default Header
