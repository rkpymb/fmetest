import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Lottie from 'react-lottie';

import * as animationData from '../Data/Lottie/113015-contact-us.json'
import { BsWhatsapp } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";

import ContactBox from '../Components/HomePage/ContactBox'
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'
export default function Home({ BackDropOpen, BackDropClose }) {
    const Contextdata = useContext(CheckloginContext)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <>
            <Navbar />
            <Head>
                <title>Contact {AppName}</title>
                <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fevicon.png" />
                <link rel='manifest' href='/manifest.json' />
            </Head>

            <div className={styles.Container}>
                <div className={styles.Aboutbox}>
                    <div className={styles.LotteSizefull}>
                        <Lottie options={defaultOptions}
                            height={400}
                            width={400}
                            isStopped={false}
                            isPaused={false} />
                    </div>
                   
                    <div className={styles.ContactPageBox}>
                        <div className={styles.ContactPageBoxItem}>
                            <div className={styles.ContactIcon}><BsWhatsapp /></div>
                            <div>Chat With us</div>
                            <div className={styles.ContactText}>+91 971704150</div>
                        </div>
                        <div className={styles.ContactPageBoxItem}>
                            <div className={styles.ContactIcon}><IoCallOutline /></div>
                            <div>Talk With us</div>
                            <div className={styles.ContactText}>+91 971704150</div>
                        </div>
                        <div className={styles.ContactPageBoxItem}>
                            <div className={styles.ContactIcon}><MdOutlineAlternateEmail /></div>
                            <div>Write to us</div>
                            <div className={styles.ContactText}>contact@flairmyevent.com</div>
                        </div>
                    </div>
                </div>
               
            </div>
            
            <Footer />
        </>
    )
}
