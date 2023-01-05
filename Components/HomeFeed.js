
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../Data/config'
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { SlLocationPin, SlInfo } from "react-icons/sl";
const HomeFeed = () => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
                            // console.log(parsed)
                            if (parsed.statusdata == true) {
                                setRetdata(parsed.RetData)
                                setIsLoading(false)
                            }

                        })

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
                <div>
                    <Skeleton variant="rectangular" height={150} />
                </div>
            }

            {!isLoading &&
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
                    
                    <div className={styles.FeelListH}>
                        {Retdata.map((item) => {
                            return <div key={item.id} className={styles.FeelListH_ITEM}>
                                <Link href={`/Profile/${item.username}`} style={{ textDecoration: 'none' }}>
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
                                        <div><span style={{fontWeight: '500'}}>{item.name}</span></div>
                                        <div className={styles.FeelListHDataFlex}>
                                            <div className={styles.FeelListHDataFlexItem}>
                                                <div><span><SlLocationPin /></span></div>
                                                <div style={{marginTop: '-3px', marginLeft: '5px'}}><span>{item.city}</span></div>
                                            </div>
                                            <div className={styles.FeelListHDataFlexItem}>
                                                <div><span><SlInfo /></span></div>
                                                <div style={{ marginTop: '-3px', marginLeft: '5px' }}><span>{item.Profession}</span></div>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
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