import VideoPlayer from '../../Components/Feeds/VideoPlayer';
import styles from '../../styles/VideoPlayer.module.css'
import { useRouter } from 'next/router'
import { FeedVideoUrl, AppName } from '../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Head from 'next/head'
import { FiPlus } from "react-icons/fi";
import React, { useRef, useState, useEffect } from "react";


const HomeFeed = ({ VendorMobile }) => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);
    const [CurrentPincode, setCurrentPincode] = useState('');
    const [CurrentCity, setCurrentCity] = useState('');
    const [CurrentState, setCurrentState] = useState('');


    useEffect(() => {
        setIsLoading(true)
        const FeedList = async () => {
            const sendUM = { pincode: 1, city: 1, VendorMobile: VendorMobile }
            const data = await fetch("/api/Feeds/FeedlistbyUser", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    if (parsed.statusdata == true) {
                        setRetdata(parsed.dataret)
                        setIsLoading(false)
                    }

                })

        }
        FeedList()


    }, [router.query])


    return (

        <>
           
            {isLoading &&
                <div>
                    <Skeleton variant="rectangular" height={150} />
                </div>
            }

            {!isLoading &&
                <div className={styles.x}>
                    <div className={styles.FeedBoxNext}>
                        {Retdata.map((item, index) => {
                            return <div className={styles.ReelsItem} key={index}>
                                <VideoPlayer src={`${FeedVideoUrl}${item.videoid}`} />
                                <div className={styles.FeedUserBox}>
                                    <div className={styles.FeedUserData}>
                                        <div>
                                            <div>
                                                <small className={styles.FeedUserType}>{item.catid}</small>
                                            </div>
                                            <div>
                                                <span>{item.fname}</span>
                                            </div>
                                            <div>
                                                <small>{item.caps}</small>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href={`/Profile/${item.username}`} style={{ textDecoration: 'none' }}>
                                                <div className={styles.Bookbtnfeed}>
                                                    <span>View Profile</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        }

                        )}

                    </div>

                </div>
            }

        </>
    )
}

export default HomeFeed