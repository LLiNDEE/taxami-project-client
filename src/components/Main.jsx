import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from '../pages/LandingPage.jsx';


const Main = () => {
    return (
        <main>
            <Routes>
                <Route
                    path="/"
                    element={<LandingPage/>}
                />
            </Routes>
        </main>
    )
};

export default Main;
