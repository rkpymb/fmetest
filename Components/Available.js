
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper";
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../Data/config'

import Skeleton from '@mui/material/Skeleton';

import Button from '@mui/material/Button';
import { SlLocationPin, SlInfo } from "react-icons/sl";

export default function SliderTopHome() {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ShowData, setShowData] = useState(false);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);
    const [CurrentPincode, setCurrentPincode] = useState('');
    const [CurrentCity, setCurrentCity] = useState('');
    const [CurrentState, setCurrentState] = useState('');

    useEffect(() => {
        setIsLoading(true)
        const SearchVendor = async () => {
            try {
                if (localStorage.getItem('Pincode')) {
                    const PincodeNow = localStorage.getItem('Pincode');
                    const StateNow = localStorage.getItem('State');
                    const CityNow = localStorage.getItem('City');
                    setCurrentPincode(PincodeNow)
                    setCurrentState(StateNow)
                    setCurrentCity(CityNow)

                    const sendUM = { pincode: PincodeNow, city: CityNow }
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
                    <div className={styles.Devider}></div>
                    <div className={styles.TitleBTNHeader}>
                        <div className={styles.TitleBTNHeaderText}>
                            <span style={{ fontWeight: 500 }}>Available in {CurrentCity} </span>
                        </div>
                        <div className={styles.TitleBTNHeaderBTN}>
                            <Button variant="outlined" size="small">
                                view more
                            </Button>
                        </div>
                    </div>
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}


                        loop={true}
                        loopFillGroupWithBlank={true}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                width: 640,
                                slidesPerView: 2,

                            },
                            // when window width is >= 768px

                            768: {
                                width: 768,
                                slidesPerView: 3,

                            },
                        }}
                        navigation={true}
                        slidesPerGroup={1}
                        spaceBetween={5}
                        slidesPerView={2}
                    >
                        {Retdata.map((item) => {
                            return <SwiperSlide key={item.id} className='swiper-container_FeedSlider'>
                                <div key={item.id} className={styles.Sliderlist_Item}>
                                    <Link href={`/Profile/${item.username}`} style={{ textDecoration: 'none' }} >
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
                                        <div className={styles.FeelListHData}>
                                            <div className={styles.FeelListHDataFlexTitle}><span style={{ fontWeight: '500' }}>{item.name}</span></div>
                                            <div className={styles.FeelListHDataFlex}>
                                                <div className={styles.FeelListHDataFlexItem}>
                                                    <div><span><SlLocationPin /></span></div>
                                                    <div style={{ marginTop: '-3px', marginLeft: '5px' }}><span>{item.city}</span></div>
                                                </div>
                                                <div className={styles.FeelListHDataFlexItem}>
                                                    <div><span><SlInfo /></span></div>
                                                    <div style={{ marginTop: '-3px', marginLeft: '5px' }}><span>{item.mainCategory}</span></div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        }

                        )}
                    </Swiper>
                </div>

            }

        </>
    );
}
