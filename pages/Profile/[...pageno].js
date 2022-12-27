import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { BASE_URL, AppName } from '../../Data/config'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton';
import { SlInfo, SlLocationPin, SlCheck } from "react-icons/sl";
import Navbar from '../../Components/Navbar'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Photos from '../../Components/VendorProfile/Photos';
import Videos from '../../Components/VendorProfile/Videos';
import Reviews from '../../Components/VendorProfile/Reviews';
import BookingPlans from '../../Components/VendorProfile/BookingPlans';
const Slug = (VendorData) => {
   
    const router = useRouter();
    const [VDATA, setVDATA] = useState(VendorData);


    const [value, setValue] = React.useState('Booking');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return <div>
        <Navbar/>
        <Head>
            <title>{VDATA && VDATA.VendorData.RetData.name} : {AppName}</title>
            <meta name="description" content={VDATA && VDATA.VendorData.RetData.shortbio} />
            {/* <meta property="og:image" content={VDATA&& blog.data.img} /> */}

        </Head>
       
        <div style={{ backgroundColor: 'white' }}>
           
            <div className={styles.Container}>
                <div className={styles.VendorDataBox}>
                    <div className={styles.VendorDataBoxA}>
                        <div className={styles.VendorDataBoxA_IMG}>
                            <div className={styles.VendorDataBoxA_VendorDp}>
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "300px",
                                    }}
                                    
                                >
                                    <Image src={`${BASE_URL}Storage/panel/Vendorsdp/${VDATA && VDATA.VendorData.RetData.dp}`} alt="Vercel Logo" layout="fill" />
                                </div>
                           </div>
                            
                           
                        </div>
                    </div>
                    <div className={styles.VendorDataBoxB}>
                        <div className={styles.VendorDataBoxA_TitleBox}>
                            <div>
                                <h1>{VDATA && VDATA.VendorData.RetData.name}</h1>
                            </div>
                            <div className={styles.VendorDataBoxA_Points}>
                                <div>
                                    <span><SlCheck /></span>
                                </div>
                                <div style={{marginTop:'-4px', marginLeft:'5px'}}>
                                    <span>{VDATA && VDATA.VendorData.RetData.Profession}</span>
                               </div>
                            </div>
                            <div className={styles.VendorDataBoxA_Points}>
                                <div>
                                    <span><SlLocationPin /></span>
                                </div>
                                <div style={{marginTop:'-4px', marginLeft:'5px'}}>
                                    <span>{VDATA && VDATA.VendorData.RetData.city}, {VDATA && VDATA.VendorData.RetData.state}, {VDATA && VDATA.VendorData.RetData.pincode}</span>
                               </div>
                            </div>
                            <div className={styles.VendorDataBoxA_Points}>
                               
                                <div style={{marginTop:'-4px', marginLeft:'5px'}}>
                                    <span>{VDATA && VDATA.VendorData.RetData.city}, {VDATA && VDATA.VendorData.RetData.state}, {VDATA && VDATA.VendorData.RetData.shortbio}</span>
                               </div>
                            </div>
                            <div style={{ height: '20px' }}></div>
                            <div className={styles.V_counterBox}>
                                <div className={styles.V_counterITEM} style={{backgroundColor:'#efecff'}}>
                                    <div><span className={styles.V_counterITEMNumber}>{VDATA && VDATA.VendorData.count_VisitsProfile}</span></div>
                                    <div><span>Prifile visits</span></div>
                                </div>
                                <div className={styles.V_counterITEM} style={{ backgroundColor: '#fff6e9' }}>
                                    <div><span className={styles.V_counterITEMNumber}>{VDATA && VDATA.VendorData.TotalBookings}</span></div>
                                    <div><span>Booked</span></div>
                                </div>
                                <div className={styles.V_counterITEM} style={{ backgroundColor: '#ffe9f1' }}>
                                    <div><span className={styles.V_counterITEMNumber}>{VDATA && VDATA.VendorData.VendorReviews}</span></div>
                                    <div><span>Review</span></div>
                                </div>
                                <div className={styles.V_counterITEM} style={{ backgroundColor: '#dcf9fd' }}>
                                    <div><span className={styles.V_counterITEMNumber}>{VDATA && VDATA.VendorData.FavoritelistAll}</span></div>
                                    <div><span>Favorites</span></div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
       </div>
        <div style={{ backgroundColor: 'white' }}>
            <div className={styles.Container}>
                <TabContext value={value}>
                    <div className={styles.VendorMenu}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Booking Plans" value="Booking" />
                                <Tab label="Photos" value="Photos" />
                                <Tab label="Videos" value="Videos" />
                                <Tab label="Reviews" value="Reviews" />
                            </TabList>
                        </Box>
                    </div>
                 
                    <TabPanel value="Booking">
                        <BookingPlans VendorMobile={VDATA && VDATA.VendorData.RetData.mobile} />
                    </TabPanel>
                    <TabPanel value="Photos">
                        <Photos VendorMobile={VDATA && VDATA.VendorData.RetData.mobile} />
                    </TabPanel>
                    <TabPanel value="Videos">
                        <Videos VendorMobile={VDATA && VDATA.VendorData.RetData.mobile} />
                    </TabPanel>
                    <TabPanel value="Reviews">
                        <Reviews VendorMobile={VDATA && VDATA.VendorData.RetData.mobile} />
                    </TabPanel>
                </TabContext>
            </div>
       </div>
      
     
        <div style={{ height: '30px' }}></div>
      
     
    
    </div>
};

export async function getServerSideProps(context) {
    const UserName = context.query.pageno[0];
    const KEY = process.env.MYKEY

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ UserName: UserName, updatekey: KEY })
    };
    const response = await fetch(`${process.env.API_URL}Website/GetVendorProfile.php`, requestOptions);
    const VendorData = await response.json();
    return {
        props: { VendorData }, // will be passed to the page component as props
    }
  
}


export default Slug;