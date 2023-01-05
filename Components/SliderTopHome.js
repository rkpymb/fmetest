import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Link from 'next/link'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from '../styles/Home.module.css'
// import required modules
import { Navigation, Autoplay } from "swiper";

import Button from '@mui/material/Button';

export default function SliderTopHome() {
    return (
        <>
           
            <Swiper
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}


                loop={false}
                loopFillGroupWithBlank={false}
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
                        slidesPerView: 1,

                    },
                }}
                navigation={true}
                slidesPerGroup={1}
                spaceBetween={5}
                slidesPerView={1}
            >
                <SwiperSlide className='swiper-container'>
                    <Link href='item/cat01/Vegetables'>
                        <div className={styles.BannerSliderCard}>
                            <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1671700840413_nye.jpg" alt='banner' className={styles.full_img} />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className='swiper-container'>
                    <Link href='item/cat01/Vegetables'>
                        <div className={styles.BannerSliderCard}>
                            <img src="https://assets-in.bmscdn.com/promotions/cms/creatives/1669651782718_webpizza.jpg" alt='banner' className={styles.full_img} />
                        </div>
                    </Link>
                </SwiperSlide>
               
                
            
            </Swiper>
        </>
    );
}
