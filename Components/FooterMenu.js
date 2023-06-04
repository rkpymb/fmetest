import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { CgFeed, CgPlayTrackNextR } from "react-icons/cg";
import { IoCall } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
const Footermenu = () => {
    return (
        <>
            {/* mobile nav bar */}
            <div className={styles.mob_footer_menu}>

                <div className={styles.mob_footer_menu_items}>
                    <Link href="/Feeds" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <CgPlayTrackNextR />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Feeds
                            </div>
                        </div>
                    </Link>
                    <Link href="/Categories" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <CgFeed />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Categories
                            </div>
                        </div>
                    </Link>
                   
                    <Link href="Contact" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <IoCall />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Contact us
                            </div>
                        </div>
                    </Link>

                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <FaUserAlt />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Account
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            {/* mobile nav bar end*/}
        </>
    )
}

export default Footermenu