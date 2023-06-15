
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../Data/config'

import Skeleton from '@mui/material/Skeleton';

import { SlLocationPin, SlInfo } from "react-icons/sl";

export default function SliderTopHome() {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ShowData, setShowData] = useState(false);
    
    const [CurrentCity, setCurrentCity] = useState('');
   

    useEffect(() => {
        setIsLoading(true)
        const SearchVendor = async () => {
            try {
                if (localStorage.getItem('City')) {
                    
                    const CityNow = localStorage.getItem('City');
                
                    setCurrentCity(CityNow)

                    const sendUM = { city: CityNow }
                    const data = await fetch("/api/HomeFeed", {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(sendUM)
                    }).then((a) => {
                        return a.json();
                    })
                        .then((parsed) => {
                            setIsLoading(false)
                            // console.log(parsed)
                            if (parsed.statusdata == true) {
                                setRetdata(parsed.RetData)
                                setShowData(true)
                            } else {
                                setShowData(false)

                            }

                        })

                } else {
                    setShowData(false)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error)
                // localStorage.clear()
            }

        }
        SearchVendor()


    }, [router.query])
    return (
        <>
            {isLoading &&
                <div className={styles.Feed_LoaderBox}>
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Feed_LoaderBoxItem} />
                </div>
            }
            {ShowData &&
                <div>
                    <div style={{ height: '30px' }}></div>
                    <div className={styles.ContainerDesktopShowbg} style={{ backgroundColor: 'white' }}>
                        <div className={styles.Container}>
                            <div style={{ height: '20px' }}></div>
                            <div className={styles.TitleBTNHeader}>
                                <div className={styles.TitleBTNHeaderText}>
                                    <span style={{ fontWeight: 500, fontSize: '20px'}}>Available in {CurrentCity} </span>
                                </div>
                                <div className={styles.TitleBTNHeaderBTN}>
                                    <Link href='/Categories' style={{ textDecoration: 'none'}} >
                                        <span>
                                            view more
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.CourseListBox}>
                                <div className={styles.CourseGrid}>
                                    {Retdata.map((item) => {
                                        return <Link href={`/Profile/${item.username}`} style={{ textDecoration: 'none' }} key={item.id}>
                                            <div className={styles.CourseItems}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        width: "100%",
                                                        height: "150px",
                                                        backgroundColor: '#c5d6e3',
                                                    }}
                                                >
                                                    <Image src={`${BASE_URL}Storage/panel/Vendorsdp/${item.dp}`} alt="Vercel Logo" layout="fill" />
                                                </div>

                                                <div className={styles.CourseItemsData}>
                                                    <div className={styles.CourseItemstitlebox}>
                                                        <span><b>{item.name}</b></span>
                                                    </div>
                                                   
                                                   
                                                    <div className={styles.coursestickerBoxFooter}>
                                                        <div className={styles.coursestickerBoxDiscountTag}>
                                                            <div className={styles.coursestickerBox}>
                                                                <div className={styles.coursestickerItem}>
                                                                    <div>
                                                                        <SlLocationPin />
                                                                    </div>
                                                                    <div className={styles.coursestickerItemtext}>
                                                                        <span>{item.city}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.coursestickerItem}>
                                                                    <div>
                                                                        <SlInfo />
                                                                    </div>
                                                                    <div className={styles.coursestickerItemtext}>
                                                                        <span>{item.mainCategory}</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className={styles.EnrollBtn}>
                                                            <span>Book now</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Link>
                                    }

                                    )}


                                </div>


                            </div>
                            <div style={{ height: '20px' }}></div>
                        </div>
                    </div>

                </div>

            }

        </>
    );
}
