import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


import * as animationData from '../Data/Lottie/113015-contact-us.json'


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
                <title>Cancellation and Refund {AppName}</title>
                <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fevicon.png" />
                <link rel='manifest' href='/manifest.json' />
            </Head>

            <div className={styles.Container}>
                <div style={{ minHeight: '100vh' }}>
                    <h1>Cancellation & Refund</h1>

                    <p> Since we all deal in online video courses/classes and it&rsquo;s a digital online service, we don&rsquo;t offer refund, unfortunately we can&rsquo;t offer you a refund or exchange. We request you to watch our sample free videos, available in almost every course. You can also watch our youtube channel videos to get to know about quality of our videos.

                    </p>

                    Refunds (if applicable)
                    <p>
                        We don&rsquo;t except refund request Late or missing refunds (if applicable) Because of digital goods and services ,we don&rsquo;t except refund requests, please contact us at contact@flairmyevent.com.
                    </p>
                    Sale items (if applicable)
                    <p>
                        Sale items cannot be refunded.
                    </p>
                    Exchanges (if applicable)
                    <p>
                        Since every shared course is in itself a valuable property, we don&rsquo;t take exchange requests too.
                    </p>
                    Shipping
                    <p>
                        On our website, everything is online. We don&rsquo;t provide CD or DVD.
                    </p>
                </div>
               
            </div>
            
            <Footer />
        </>
    )
}
