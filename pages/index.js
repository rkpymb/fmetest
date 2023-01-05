import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import LocationBox from '../Components/LocationBox'
import HomeSlider from '../Components/HomeSlider'
import CategoriesList from '../Components/CategoriesList'
import Available from '../Components/Available'
import WelcomeUser from '../Components/WelcomeUser'
import AboutBox from '../Components/HomePage/AboutBox'
import AboutAccordion from '../Components/HomePage/AboutAccordion'
import Reviews from '../Components/HomePage/Reviews'
import ContactBox from '../Components/HomePage/ContactBox'
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'
export default function Home({ BackDropOpen, BackDropClose }) {
  const Contextdata = useContext(CheckloginContext)
  return (
    <>
      <Navbar />
      <Head>

        <title>{AppName}</title>
        <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fevicon.png" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <div className={styles.ContainerDesktopShowbg}>
        <div style={{ height: '10px' }}></div>
        <div className={styles.Container}>
          {Contextdata.IsLogin &&
            <div style={{ padding: '10px' }}>
              <WelcomeUser />
            </div>
          }
          <div style={{ padding: '10px' }}>
            <LocationBox BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
          </div>
          <div style={{ padding: '0px' }}>
            <HomeSlider />
          </div>
        </div>
        
      </div>

      <div className={styles.Container}>

      </div>
      <div className={styles.Container}>
        <CategoriesList />
        <Available />

      </div>
      <div className={styles.ContainerDesktopShowbg}>
        <div className={styles.Container}>

          <AboutBox />
          <AboutAccordion />
          <div style={{ height: '30px' }}></div>
        </div>
      </div>
      <div>
        <div className={styles.Container}>
          <Reviews />
          <div style={{ height: '30px' }}></div>
        </div>
      </div>
      <div className={styles.ContainerDesktopShowbg_Contact}>
        <div className={styles.Container}>
          <ContactBox />
        </div>
      </div>
      <Footer/>
    </>
  )
}
