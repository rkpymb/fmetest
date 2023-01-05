import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'


import BookingDetails from '../../Components/UserProfile/Modals/BookingDetails'

import { BASE_URL } from '../../Data/config'

import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { SlLocationPin, SlInfo } from "react-icons/sl";
const Photos = ({ UserMobile }) => {
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // console.log(UserMobile)
        const handleSubmit = async () => {
            const dataid = UserMobile;
            const sendUM = { dataid }
            const data = await fetch("/api/UserBookingList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    // console.log(parsed.dataret)
                    setRetdata(parsed.dataret)
                    setIsLoading(false)
                  
                })
        }
        handleSubmit()


    }, [router.query])
  return (
    <div>
          {isLoading &&
              <div className={styles.GridBox}>
                  <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} />
                  <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} />
                  <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} />
              </div>
          }
          {!isLoading &&
              <div>
                 
                  <div className={styles.TitleBTNHeader}>
                      <div className={styles.TitleBTNHeaderText}>
                          <span style={{ fontWeight: 500 }}>Total Bookings ({Retdata.length}) </span>
                      </div>
                      
                  </div>

                  <div>
                      
                      <div className={styles.GridBox}>
                          {Retdata.map((item) => {
                              return <div className={styles.GridBox_ITEM_MyBookingsItem} key={item.id}>
                                  <div className={styles.GridBox_ITEM_MyBookingsItemA}>
                                      <div style={{fontSize:'10px', fontWeight:500}}><span>#{item.BookingID}</span></div>
                                      
                                      <div style={{ fontSize: '15px' }}><span>{item.Title}</span></div>
                                      <div style={{ fontSize: '10px' }}><span>{item.BookingForName}</span></div>
                                      <div style={{ fontSize: '10px' }}><span>₹{item.finalAmt}</span></div>
                                      <div style={{ fontSize: '10px' }}><span>{item.date}</span></div>
                                 </div>
                                  <div className={styles.GridBox_ITEM_MyBookingsItemB}>
                                      <div style={{ fontSize: '10px', fontWeight: 500, color: 'green' }}>
                                          <span>{item.StatusText}</span>
                                      </div>
                                      <div style={{ fontSize: '10px',color: 'black' }}>
                                          <BookingDetails Data={item} />
                                      </div>
                                  </div>
                              </div>
                          }

                          )}
                      </div>

                  </div>
              </div>
          }
    </div>
  )
}

export default Photos
