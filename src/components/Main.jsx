import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from '../pages/LandingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import { useGlobal } from '../providers/GlobalProvider.jsx';
import { AUTH_STATUSES } from '../utils/constants.js';

const Main = () => {

    const { authStatus } = useGlobal()

    return (
        <main>
            {authStatus === AUTH_STATUSES.idle ? 
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
            : authStatus === AUTH_STATUSES.loggedIn ? 
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/"/>}
                />
            </Routes>
            : null
            }
        </main>
    )
};

export default Main;
