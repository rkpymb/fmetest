import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../../styles/Home.module.css'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import CategoriesList from '../../Components/CategoriesList'
import ContactBox from '../../Components/HomePage/ContactBox'
import { BASE_URL, AppName } from '../../Data/config'
export default function Home({ BackDropOpen, BackDropClose }) {
  return (
    <>
      <Navbar BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
      <Head>

        <title>Categories : {AppName}</title>
        <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>



      <div style={{ height: '0px' }}></div>
      <div className={styles.Container}>
        <div className={styles.TitleBTNHeader}>
          <div className={styles.TitleBTNHeaderText}>
            <span style={{ fontWeight: 500, fontSize: '20px' }}>Browse by Category  </span>
          </div>

        </div>
        <div style={{ minHeight: '100vh'}}>
          <CategoriesList />
         
       </div>

      </div>
      <div style={{ height: '50px' }}></div>


      <div className={styles.ContainerDesktopShowbg_Contact}>
        <div className={styles.Container}>
          <ContactBox />
        </div>
      </div>
      <Footer />
    </>
  )
}
