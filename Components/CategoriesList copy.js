
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../Data/config'
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
const CategoriesList = () => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/CategoriesList", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    // console.log(parsed)
                    setRetdata(parsed.RetData)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    return (

        <>
            {isLoading &&
                <div className={styles.Cat_LoaderBox}>
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />
                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />

                    <Skeleton variant="rectangular" className={styles.Cat_LoaderBoxItem} />

                </div>
            }

            {!isLoading &&

                <div>

                    <div className={styles.TitleBTNHeader}>
                        <div className={styles.TitleBTNHeaderText}>
                            <span style={{ fontWeight: 500 }}>Browse by category  </span>
                        </div>

                    </div>
                    <div className={styles.CatGrid}>
                        {Retdata.map((item) => {
                            return <Link href={`/category/${item.Catid}`} className={styles.CatGridItem} style={{ textDecoration: 'none' }}>
                                <div className={styles.CatBoxItemCenter}>
                                    <div>
                                        <Image
                                            src={`${BASE_URL}Storage/panel/Catimg/${item.img}`}
                                            alt="Picture of the author"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div>
                                        <span>{item.title}</span>

                                    </div>
                                </div>
                            </Link>
                        }

                        )}
                    </div>

                </div>
            }

        </>
    )
}

export default CategoriesList