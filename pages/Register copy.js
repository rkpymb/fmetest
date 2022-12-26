import React from 'react'
import { useState, useEffect, useContext } from 'react';
import CheckloginContext from '../context/auth/CheckloginContext.js'
import { useRouter } from 'next/router'
import NavbarWithTitle from '../Components/NavbarWithTitle'
const Register = ({ BackDropOpen, BackDropClose}) => {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [usermobile, setMob] = useState('');
    useEffect(() => {
        try {
            if (localStorage.getItem('OTPSTATUS') && localStorage.getItem('UserMobile')) {
                const userM = localStorage.getItem('UserMobile');
                setMob(userM)
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    });
  return (
    <div>
      
    </div>
  )
}

export default Register
