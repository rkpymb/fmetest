import { useState, useEffect, useContext } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Skeleton from '@mui/material/Skeleton';
import CheckloginContext from '../../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../../Data/config'
import styles from '../../styles/Home.module.css'

const AddToFav = ({ UserMobile, username }) => {
    const [LoaderFav, setLoaderFav] = useState(false);
    const [ShowbTN, setShowbTN] = useState(false);
        
    useEffect(() => {
        handleSubmit()
    }, [])
    const handleSubmit = async () => {
        const sendUM = { UserName: username, UserMobile: UserMobile }
        const data = await fetch("/api/IsInfavList_Vendor", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setLoaderFav(false)
                setShowbTN(parsed.statusdata)
            })
    }
    const AddToFavbtn = async () => {
        setLoaderFav(true)
        const sendReg = { UserName: username, UserMobile: UserMobile }
        const data = await fetch("/api/AddToFav", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendReg)
        }).then((b) => {
            return b.json();
        })
            .then((ParcedAddToFavRET) => {
                if (ParcedAddToFavRET.statusdata == true) {
                    alert(ParcedAddToFavRET.RetData)
                    handleSubmit()
                } else {
                    setLoaderFav(false)
                    alert(ParcedAddToFavRET.RetData)
                }
               
            })
    
    }
    const RemoveToFavbtn = async () => {
        setLoaderFav(true)
        const sendReg = { UserName: username, UserMobile: UserMobile }
        const data = await fetch("/api/RemoveToFav", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendReg)
        }).then((b) => {
            return b.json();
        })
            .then((ParcedAddToFavRET) => {
                if (ParcedAddToFavRET.statusdata == true) {
                    alert(ParcedAddToFavRET.RetData)
                    handleSubmit()
                } else {
                    setLoaderFav(false)
                    alert(ParcedAddToFavRET.RetData)
                }
               
            })
    
    }
    return (
        <div>
            {LoaderFav &&
                <Skeleton variant="rectangular" className={styles.LoaderSkeltonBookinglist} height={30} width={30} />
            }
            {!LoaderFav &&
                <div>
                    {ShowbTN &&
                        <div className={styles.FavBTN}>
                            <AiTwotoneHeart onClick={RemoveToFavbtn} />
                           
                        </div>
                    }
                    {!ShowbTN &&
                        <div className={styles.FavBTN} onClick={AddToFavbtn}>
                            <AiOutlineHeart />
                            
                        </div>

                    }
                </div>
            }

        </div>
    )
}

export default AddToFav
