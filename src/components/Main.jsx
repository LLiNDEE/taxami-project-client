import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from '../pages/LoginPage.jsx';
import OverviewPage from '../pages/OverviewPage'
import Buildings from '../pages/Buildings.jsx';
import DataProvider from '../providers/DataProvider.jsx';
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
            <DataProvider>
                <Routes>
                    <Route
                        path="/oversikt"
                        element={<OverviewPage/>}
                    />
                    <Route
                        path="/byggnad/:id"
                        element={<Buildings/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/oversikt"/>}
                    />
                </Routes>
            </DataProvider>
            : null
            }
        </main>
    )
};

export default Main;
