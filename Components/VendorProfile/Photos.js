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
const Photos = ({ VendorMobile }) => {
    const router = useRouter();
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // console.log(VendorMobile)
        const handleSubmit = async () => {
            const dataid = VendorMobile;
            const sendUM = { dataid }
            const data = await fetch("/api/VendorPhotoslist", {
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
                          <span style={{ fontWeight: 500 }}>Photos ({Retdata.length}) </span>
                      </div>
                      
                  </div>

                  <div className={styles.VendorPhotosList}>
                      
                      <div className={styles.GridBox}>
                          {Retdata.map((item) => {
                              return <div className={styles.GridBox_ITEM} key={item.id}>
                                  <div
                                      style={{
                                          position: "relative",
                                          width: "100%",
                                          height: "100%",
                                          backgroundColor: '#c5d6e3',
                                      }}
                                  >
                                      <Image src={`${BASE_URL}Storage/panel/Vendorphotos/${item.img}`} alt="Vercel Logo" layout="fill" />
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
