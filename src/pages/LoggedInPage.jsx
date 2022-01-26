import React, { useState } from 'react'

import Header from '../components/header/Header'
import Overview from '../components/overview/Overview';
import { useGlobal } from '../providers/GlobalProvider';

const LoggedInPage = () => {

    const { buildings } = useGlobal()

    return (
        <div>
            <Header/>
            <Overview/>
        </div>
    )

};

export default LoggedInPage;
