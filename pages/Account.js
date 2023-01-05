import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import { BASE_URL, AppName } from '../Data/config'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton';
import { SlInfo, SlLocationPin, SlCheck } from "react-icons/sl";
import Navbar from '../Components/Navbar'
import CheckloginContext from '../context/auth/CheckloginContext'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Bookinglist from '../Components/UserProfile/Bookinglist';
const Account = (VendorData) => {
  const Contextdata = useContext(CheckloginContext)
  const router = useRouter();
  const [value, setValue] = React.useState('MyAccount');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <div>
    <Navbar />
    <Head>
      <title>{Contextdata.Data.name} Profile @{AppName}</title>
    </Head>

    <div style={{ backgroundColor: 'white' }}>
      <div className={styles.Container}>
        <div className={styles.MYPROFILE_A}>
          <div className={styles.MYProfileTop}>
            <div>
              <Image
                src={`${BASE_URL}Storage/panel/userdp/${Contextdata.Data.dp}`}
                alt="Picture of the author"
                width={150}
                height={150}
              />
            </div>
            <div>
              <div>
                <span style={{ fontSize: '20px', fontWeight: 500 }}>{Contextdata.Data.name}</span>
              </div>
              <div>
                <span>+91 {Contextdata.Data.mobile}</span>
              </div>
              <div>
                <span>{Contextdata.Data.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ backgroundColor: 'white' }}>
      <div className={styles.Container}>
        <div className={styles.MyProfilemenuMenu}>
          <TabContext value={value}>
            <div >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="My Account" value="MyAccount" />
                 
                  <Tab label="My Booking" value="MyBooking" />
                  <Tab label="My Favorites" value="MyFavorites" />
                </TabList>
              </Box>
            </div>
            <TabPanel value="MyAccount">
              My Acount is coming soon
            </TabPanel>
            <TabPanel value="MyBooking">
              <Bookinglist UserMobile={Contextdata.Data.mobile} />
            </TabPanel>
            <TabPanel value="MyFavorites">
              My Favorites is coming soon
            </TabPanel>
            

          </TabContext>
        </div>
      </div>
    </div>
    <div style={{ height: '30px' }}></div>



  </div>
};



export default Account;