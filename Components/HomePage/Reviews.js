import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { BASE_URL } from '../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import { SlLocationPin, SlInfo } from "react-icons/sl";
const Reviews = ({ VendorMobile }) => {
  const router = useRouter();
  const [Retdata, setRetdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    // console.log(VendorMobile)
    const handleSubmit = async () => {
      const dataid = VendorMobile;
      const sendUM = { dataid }
      const data = await fetch("/api/AllReviewslist", {
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
    <div style={{ padding: '10px' }}>
      <div>
        <h1 style={{ margin: '0px' }}>What our Customers and vendor says  ?</h1>
        <span style={{ fontWeight: 'bold' }}>Feedback & Reviews</span>
      </div>
      <div style={{ height: '30px' }}></div>
      {isLoading &&
        <div className={styles.GridBox}>
          <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
          <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
          <Skeleton variant="rectangular" className={styles.LoaderSkelton} />
        </div>
      }
      {!isLoading &&
        <div>
          <div className={styles.GridBox}>
            {Retdata.map((item) => {
              return <div className={styles.GridBox_ITEM_review} key={item.id}>
                <div className={styles.GridBox_reviewItemA}>
                  <div className={styles.GridBox_reviewItemIMG}>
                    <Image src='/user.png' width={20} height={20} />
                  </div>
                </div>
                <div className={styles.GridBox_reviewItemB}>
                  <div style={{ fontWeight: 500 }}>{item.ReviewName}</div>
                  <div>
                    <div>{[...Array.from(Array(parseInt(item.Starts)).keys())].map((num, i) => <span key={i}>⭐</span>)} {item.Starts}/5 stars</div>
                  </div>
                  <div className={styles.ReviewText}>{item.ReviewText}</div>
                  <div style={{ fontSize: '8px' }}>{item.date}</div>
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
