import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';

import './Header.scss'

import useAuth from '../../hooks/useAuth'

const Header = () => {

    const auth = useAuth()

    return (
        <header>
            <h2 className="headerTitle">Taxamiiiiiiii</h2>
            <div className="logoutButtonContainer">
                <button className="logOutbutton" onClick={() => auth.logoutUser()}>Logga ut <LogoutIcon className="logoutIcon"/> </button>
            </div>
        </header>
    )
}

export default Header
