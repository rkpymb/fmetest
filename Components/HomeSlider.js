import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Autoplay, Pagination } from "swiper";
import 'swiper/swiper-bundle.css';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router'
import { BASE_URL } from '../Data/config'
import Link from 'next/link';
SwiperCore.use([Navigation]);

export default () => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);


    useEffect(() => {
        setIsLoading(true)
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/HomeSliderlist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    // console.log(parsed.RetData)
                    setRetdata(parsed.RetData)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])


    return (
        <>

            {isLoading &&
                <Skeleton variant="rectangular" sx={{ bgcolor: 'grey.900' }} className={styles.Slider_LoaderBoxItem} height={267} />
            }

            {!isLoading &&
                <div>

                    <Swiper
                        breakpoints={{
                           
                            909: {
                                width: 909,
                                slidesPerView: 2,
                            },
                       
                            901: {
                                width: 901,
                                slidesPerView: 1,
                            },
                        }}
                        id="main"
                        loop={true}
                        loopFillGroupWithBlank={true}
                        modules={[Navigation, Autoplay, Pagination]}
                        pagination={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: false,
                        }}
                        navigation
                        spaceBetween={5}
                        slidesPerView={1}
                    >
                        {Retdata.map((item) => {
                            return <SwiperSlide tag="li" style={{ listStyle: 'none' }} key={item.id}>
                                <img
                                    style={{ width: '100%' }}
                                    src={`${BASE_URL}Storage/panel/Sliders/${item.img}`}
                                    alt={`Slide`}
                                />
                            </SwiperSlide>
                        }

                        )}
                    </Swiper>

                </div>
            }

        </>
    );
};