import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoggedInPage from '../pages/LoggedInPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import Buildings from '../pages/Buildings.jsx';
import { useGlobal } from '../providers/GlobalProvider.jsx';
import { AUTH_STATUSES } from '../utils/constants.js';

const Main = () => {

    const { authStatus } = useGlobal()

    return (
        <main>
            {authStatus === AUTH_STATUSES.idle ? 
            <Routes>
                <Route
                    path="/loggain"
                    element={<LoginPage/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/loggain" />}
                />
            </Routes>
            : authStatus === AUTH_STATUSES.loggedIn ? 
            <Routes>
                <Route
                    path="/oversikt"
                    element={<LoggedInPage/>}
                />
                <Route
                    path="/byggnader"
                    element={<Buildings/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/oversikt"/>}
                />
            </Routes>
            : null
            }
        </main>
    )
};

export default Main;
