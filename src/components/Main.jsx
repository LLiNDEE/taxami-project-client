import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from '../pages/LandingPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';

const Main = () => {
    return (
        <main>
            <Routes>
                {/* <Route
                    path="/"
                    element={<LandingPage/>}
                /> */}
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />
            </Routes>
        </main>
    )
};

export default Main;
