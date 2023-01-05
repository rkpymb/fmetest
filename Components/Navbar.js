import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { SlLockOpen, SlEmotsmile } from "react-icons/sl";
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'

const Navbar = ({ BackDropOpen, BackDropClose }) => {
    const Contextdata = useContext(CheckloginContext)

  return (
      <div className={styles.Navbar}>
          <div className={styles.NavbarBox}>
              <div className={styles.NavbarBoxLeft}>
                  <div className={styles.logo}>
                      <Link href='/'>
                          <img src='/mainlogo.png' alt='logo'  className={styles.Navlogo} />
                      </Link>
                  </div>
                 
              </div>
              <div className={styles.NavbarBoxRight}>
                  <div className={styles.NavbarBoxRightBTNBOX}>
                      {!Contextdata.IsLogin &&
                          <Link href='/Login' style={{ textDecoration: 'none' }}>
                              <div className={styles.NavBTN}>
                                  <div className={styles.NavBTN_ICON}>
                                      <span> <SlLockOpen /></span>
                                  </div>
                                  <div className={styles.NavBTN_TEXT}>
                                      <span>Login</span>
                                  </div>
                              </div>
                          </Link>
                      }
                      {Contextdata.IsLogin &&
                          <Link href='/Account' style={{ textDecoration: 'none' }}>
                              <div className={styles.UserProfileTop}>
                                  <div>
                                      <Image
                                          src={`${BASE_URL}Storage/panel/userdp/${Contextdata.Data.dp}`}
                                          alt="Picture of the author"
                                          width={40}
                                          height={40}
                                      />
                                  </div>
                                 
                              </div>
                          </Link>
                      }
                      
                     
                 </div>
              </div>
          </div>
    </div>
  )
}

export default Navbar
