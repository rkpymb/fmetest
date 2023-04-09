import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { BASE_URL } from '../../Data/config'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
const MyFavList = ({ UserMobile }) => {
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // console.log(UserMobile)
        const handleSubmit = async () => {
            const dataid = UserMobile;
            const sendUM = { dataid }
            const data = await fetch("/api/UserFavList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    console.log(parsed.FinalData)
                    setRetdata(parsed.FinalData)
                    setIsLoading(false)

                })
        }
        handleSubmit()


    }, [router.query])
    return (
        <div>
            {isLoading &&
                <div className={styles.GridBox}>
                    <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} height={150} />
                    <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} height={150} />
                    <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} height={150} />
                </div>
            }
            {!isLoading &&
                <div>

                    <div className={styles.TitleBTNHeader}>
                        <div className={styles.TitleBTNHeaderText}>
                            <span style={{ fontWeight: 500 }}>My favorites ({Retdata.length}) </span>
                        </div>

                    </div>

                    <div>

                        <div className={styles.GridBox}>
                            {Retdata.map((item) => {
                                return <div className={styles.GridBox_ITEM_MyBookingsItem} key={item.data[0].id}>
                                    <Link href={`/Profile/${item.data[0].username}`} style={{ textDecoration: 'none' }} className={styles.MyFavITEMBOX}>
                                        <div className={styles.MyFavITEMBOX_IMG}>
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: "50px",
                                                }}

                                            >
                                                <Image src={`${BASE_URL}Storage/panel/Vendorsdp/${item.data[0].dp}`} alt="Vercel Logo" layout="fill" />
                                            </div>

                                        </div>
                                        <div className={styles.MyFavITEMBOX_DATA}>
                                            <div style={{ fontSize: '15px' }}><span>{item.data[0].name}</span></div>
                                        </div>
                                    </Link>

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

export default MyFavList
