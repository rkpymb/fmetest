import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { SlLockOpen, SlEmotsmile } from "react-icons/sl";
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'

const Footer = ({ BackDropOpen, BackDropClose }) => {
    const Contextdata = useContext(CheckloginContext)

    return (
        <div className={styles.Footer}>
            <div className={styles.FooterMenuBox}>
                <Link href={`https://vendor.flairmyevent.com/pages/login/`} style={{ textDecoration: 'none' }}>
                    <div className={styles.FooterMenuBoxItem}>
                        <span>Vendor Login</span>
                    </div>
                </Link>
                <Link href={`/About`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                   <span>About us</span>
                </div>
                 </Link>
                <Link href={`/Contact`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                   <span>Contact us</span>
                </div>
                </Link>
                <Link href={`/PrivacyPolicy`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                    <span>Privacy Policy</span>
                    </div>
                </Link>
                <Link href={`/TermsandCondition`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                    <span>Terms and Condition</span>
                    </div>
                </Link>
                <Link href={`/CancellationRefund`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                    <span>Cancellation & Refund</span>
                </div>
                </Link>
                <Link href={`/Shippingdelivery`} style={{ textDecoration: 'none' }}>
                <div className={styles.FooterMenuBoxItem}>
                    <span>Shipping & delivery</span>
                </div>
                </Link>
            </div>
            <div style={{textAlign: 'center', fontSize:10, margin:'10px'}}>
                <span>© 2022-2023 www.flairmyevent.com, All rights reserved.</span>  
            </div>
        </div>
    )
}

export default Footer
