import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'

import './Header.scss'
import Chip from '../core/Chip/Chip';
import Flex from '../core/Flex/Flex';

import useAuth from '../../hooks/useAuth'
import useBreakpoint from '../../hooks/useBreakpoint'

const Header = () => {

    const auth = useAuth()

    const { sm } = useBreakpoint()

    return (
        <header>
            <h2 className="headerTitle"><Link to="/oversikt">Taxamiiiiiiii</Link></h2>
            {!sm && 
            <Flex justify="right">
                <Link to="/mittkonto"><Chip className="myAccountChip" labelText="Mitt konto"/></Link>
            </Flex>
            }
            <div className="logoutButtonContainer">
                <button className="logOutbutton" onClick={() => auth.logoutUser()}>Logga ut <LogoutIcon className="logoutIcon"/> </button>
            </div>
        </header>
    )
}

export default Header
