import { useState, useEffect, useContext } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Skeleton from '@mui/material/Skeleton';

import styles from '../../styles/Home.module.css'

const AddToFav = ({ UserMobile}) => {
    const [LoaderFav, setLoaderFav] = useState(true);
    
    const [TotalReviews, setTotalReviews] = useState('');
    const [TotalBookings, setTotalBookings] = useState('');
    const [TotalFavorites, setTotalFavorites] = useState('');

    useEffect(() => {
        handleSubmit()
    }, [])
    const handleSubmit = async () => {
        const sendUM = {UserMobile: UserMobile }
        const data = await fetch("/api/UserCounter", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setTotalReviews(parsed.TotalReviews)
                setTotalBookings(parsed.TotalBooking)
                setTotalFavorites(parsed.TotalFavorites)
                setLoaderFav(false)
               
            })
    }
 
    return (
        <div>
            {LoaderFav &&
                <Skeleton variant="rectangular" className={styles.UserCounter} height={100} />
            }
          
            {!LoaderFav &&
                <div className={styles.UserCounterBox}>
                    <div className={styles.UserCounterBoxITEM} style={{ backgroundColor: '#fff6e9' }}>
                        <div><span className={styles.V_counterITEMNumber}>{TotalBookings}</span></div>
                        <div><span>Bookings</span></div>
                    </div>
                    <div className={styles.UserCounterBoxITEM} style={{ backgroundColor: '#ffe9f1' }}>
                        <div><span className={styles.V_counterITEMNumber}>{TotalReviews}</span></div>
                        <div><span>Review</span></div>
                    </div>
                    <div className={styles.UserCounterBoxITEM} style={{ backgroundColor: '#dcf9fd' }}>
                        <div><span className={styles.V_counterITEMNumber}>{TotalFavorites}</span></div>
                        <div><span>Favorites</span></div>
                    </div>
                </div>
            }

        </div>
    )
}

export default AddToFav
