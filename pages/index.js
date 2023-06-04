import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/footerNew'
import FooterMenu from '../Components/FooterMenu'

import HomeSlider from '../Components/HomeSlider'
import CategoriesList from '../Components/CategoriesList'
import Available from '../Components/Available'
import AppHeroBox from '../Components/AppHeroBox'
import HeroBox2 from '../Components/HomePage/HeroBox2'
import AboutBox from '../Components/HomePage/AboutBox'
import AboutAccordion from '../Components/HomePage/AboutAccordion'
import Reviews from '../Components/HomePage/Reviews'
import ContactBox from '../Components/HomePage/ContactBox'
import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'
import { useRouter } from 'next/router'
export default function Home({ BackDropOpen, BackDropClose }) {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)

  useEffect(() => {
    try {
      if (localStorage.getItem('Pincode')) {
        setMobileLocationBox(true)
      } else {
        setMobileLocationBox(false)
      }
    } catch (error) {
      console.error(error)
      // localStorage.clear()
    }
  }, [router.query]);
  return (
    <>
      <Navbar BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
    
      <Head>

        <title>{AppName}</title>
        <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fevicon.png" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <div className={styles.ContainerWithimg}>

        <div className={styles.Opac}>
          <HomeSlider />

        </div>

      </div>
      <div className={styles.onlymobile}> </div>
      <div className={styles.CatHomeBox}>
        <div style={{ height: '5px' }}></div>
        <div className={styles.titlebxcenter}>
          <span style={{ fontWeight: 500, fontSize: '18px' }}>👉 Browse talent by category </span>
        </div>
        <div style={{ height: '10px' }}></div>
        <CategoriesList />
      </div>

      <Available />
     
      <div className={styles.ContainerDesktopShowbg} style={{ backgroundColor: 'white' }}>
        <div className={styles.Container}>

          <AboutBox />
          <AboutAccordion />
          <div style={{ height: '30px' }}></div>
        </div>
      </div>
      <div style={{ height: '30px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: 'white' }}>
        <div className={styles.container} >
          <AppHeroBox />
        </div>
      </div>
      <div style={{ height: '100px' }}> </div>

      <div>
        <div className={styles.Container}>
          <Reviews />
          <div style={{ height: '30px' }}></div>
        </div>
      </div>
      <div className={styles.container_full} style={{ backgroundColor: '#232323' }} >
        <Footer />
      </div>
      <FooterMenu />
     
     
    </>
  )
}
