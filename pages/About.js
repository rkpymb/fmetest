import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Lottie from 'react-lottie';

import * as animationData from '../Data/Lottie/84565-about-us.json'
import AboutBox from '../Components/HomePage/AboutBox'
import AboutAccordion from '../Components/HomePage/AboutAccordion'

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
                <title>About {AppName}</title>
                <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fevicon.png" />
                <link rel='manifest' href='/manifest.json' />
            </Head>

            <div className={styles.Container}>
                <div className={styles.Aboutbox}>
                    <div className={styles.sidebysideA}>
                        <Lottie options={defaultOptions}
                            height={400}
                            width={500}
                            isStopped={false}
                            isPaused={false} />
                    </div>
                    <div className={styles.sidebysideB}>
                        <AboutBox />
                        <AboutAccordion />
                    </div>

                </div>
            </div>
            <div className={styles.ContainerDesktopShowbg_Contact}>
                <div className={styles.Container}>
                    <ContactBox />
                </div>
            </div>
            <Footer />
        </>
    )
}
