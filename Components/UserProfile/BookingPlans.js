import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'


import Image from 'next/image'

import { BASE_URL } from '../../Data/config'

import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { SlLocationPin, SlInfo } from "react-icons/sl";
const Reviews = ({ VendorMobile }) => {
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // console.log(VendorMobile)
        const handleSubmit = async () => {
            const dataid = VendorMobile;
            const sendUM = { dataid }
            const data = await fetch("/api/VendorBookingPlanslist", {
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
                    <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
                    <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
                    <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
                </div>
            }
            {!isLoading &&
                <div>

                    <div className={styles.TitleBTNHeader}>
                        <div className={styles.TitleBTNHeaderText}>
                            <span style={{ fontWeight: 500 }}>{Retdata.length} Booking Plans available  </span>
                        </div>

                    </div>

                    <div className={styles.GridBox}>
                        {Retdata.map((item) => {
                            return <div className={styles.GridBox_ITEM_Booking} key={item.id}>
                                <div className={styles.GridBox_ITEM_BookingA}>
                                    <div style={{ fontWeight: 500 }}>{item.Title}</div>
                                    <div className={styles.ReviewText}>{item.Details}</div>
                                    <div>
                                        <span> <del>{item.MainPrice}</del><span style={{ fontWeight: 500, fontSize: 20 }}> ₹{item.SalePrice}</span></span>
                                        <div><span style={{  fontSize: 10 }}>This Price is valid Only for Today's Bookings</span></div>
                                    </div>
                                </div>
                                <div style={{ height: '10px' }}></div>
                                <div className={styles.GridBox_ITEM_BookingB}>
                                    <div className={styles.GridBox_ITEM_BookingBFooter}>
                                        <Link href={`/BookingProcess/${item.id}`} style={{ textDecoration: 'none' }}>
                                        <Button variant="outlined" size="small">
                                            Book
                                            </Button>
                                        </Link>
                                        <div className={styles.GridBox_ITEM_BookingBSaveTag}>
                                            <span>Save ₹{item.MainPrice - item.SalePrice} on Booking</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        }

                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Reviews
