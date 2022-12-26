import { useState, useEffect, useContext } from 'react';

import CheckloginContext from '../context/auth/CheckloginContext'
const WelcomeUser = () => {
    const Contextdata = useContext(CheckloginContext)
    return (
        <div>
            <div style={{ marginTop: '-2px', marginLeft: '5px', fontSize: '12px' }}>
                <span style={{ fontSize: '25px' }}>Hi👋 {Contextdata.Data.name}</span>
            </div>
        </div>
    )
}

export default WelcomeUser
