import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { SlLockOpen, SlEmotsmile } from "react-icons/sl";
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'
import { BiMobileVibration } from "react-icons/bi";
import { HiOutlinePlay } from "react-icons/hi";
import { CgFeed, CgPlayTrackNextR } from "react-icons/cg";
import LocationBox from './LocationBox'
import { useRouter } from 'next/router'

const Navbar = ({ BackDropOpen, BackDropClose }) => {
    const router = useRouter()
    const [MobileLocationBox, setMobileLocationBox] = useState(false);
    const Contextdata = useContext(CheckloginContext)

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('Pincode')) {
                setMobileLocationBox(true);
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    }, [router.query]);

    return (
        <>
            <div className={styles.Navbar}>
                <div className={styles.NavbarBox}>
                    <div className={styles.NavbarBoxLeft}>
                        <div className={styles.logo}>
                            <Link href='/'>
                                <img src='/logo/fmelogo-dark.svg' alt='logo' className={styles.Navlogo} />
                            </Link>
                        </div>
                        {/* <div style={{ marginLeft: '10px', marginTop: '15px' }}>
                            <LocationBox BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
                        </div> */}
                    </div>
                    <div className={styles.NavbarBoxRight}>
                        <div className={styles.NavbarBoxRightBTNBOX}>
                            <div className={styles.NavbarBoxRightBTNBOX}>
                                <Link href='/Feeds' style={{ textDecoration: 'none' }} >
                                    <div className={styles.NavbarTopiconmenuItem} >
                                        <div className={styles.NavbarTopiconmenuItemIcon}>
                                            <span>
                                                <CgPlayTrackNextR />
                                            </span>
                                        </div>
                                        <div className={styles.NavbarTopiconmenuItemText}><span> Feeds</span></div>
                                    </div>
                                </Link>
                             
                            </div>
                            <div className={styles.NavbarBoxRightBTNBOX}>
                                <Link href='/Categories' style={{ textDecoration: 'none' }} >
                                    <div className={styles.NavbarTopiconmenuItem} >
                                        <div className={styles.NavbarTopiconmenuItemIcon}>
                                            <span>
                                                <CgFeed />
                                            </span>
                                        </div>
                                        <div className={styles.NavbarTopiconmenuItemText}><span> Categories</span></div>
                                    </div>
                                </Link>
                             
                            </div>

                            <div style={{ marginLeft: '30px' }}>
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
                                                    alt=""
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
            </div>
            <div className={styles.MobileNav}>
                <div className={styles.MobileNavBox}>
                    <div className={styles.MobileNavBoxLeft}>
                        <div className={styles.logoMobile}>
                            <Link href='/'>
                                <img src='/logo/fmelogo-lightcolor.svg' alt='logo' />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.MobileNavBoxRight}>
                        <div className={styles.MobileNavBoxRightMenuBox}>
                            <div className={styles.MobileNavBoxRightMenuITEM}>
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
                                                    alt=""
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
            

            </div>

            <div className={styles.mobLocation}>
                {MobileLocationBox &&
                    <LocationBox BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />

                }


            </div>
           
        </>
    )
}

export default Navbar
