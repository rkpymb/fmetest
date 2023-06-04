import VideoPlayer from '../Components/Feeds/VideoPlayer';
import styles from '../styles/VideoPlayer.module.css'
import { useRouter } from 'next/router'
import { FeedVideoUrl, AppName } from '../Data/config'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Head from 'next/head'
import { FiPlus } from "react-icons/fi";
import React, { useRef, useState, useEffect } from "react";
const videos = [
  'https://aitechnolog.com/videos/vsreserser1.mp4',
  'https://aitechnolog.com/videos/guyguyguguguy.mp4',
  'https://aitechnolog.com/videos/hfyfyfytfyfy.mp4',
];

const HomeFeed = ({ BackDropOpen, BackDropClose }) => {
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
      const sendUM = { pincode: 1, city: 1 }
      const data = await fetch("/api/Feeds/Feedlist", {
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
      <Head>
        <title>Feeds : {AppName}</title>
        <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fevicon.png" />
      </Head>

      <div className={styles.FeedNavbar}>
        <div className={styles.FeedNavbarBox}>
          <div className={styles.NavbarBoxLeft}>
            <Link href='/' style={{ textDecoration: 'none' }}>
              <div className={styles.NavbarBoxLeftlogo}>
                <div>
                  <img src='/logo/mainlogo.png' alt='logo' className={styles.Navlogo} />
                </div>
                <div className={styles.NavbarBoxLeftlogoText}>
                  <span>/ feeds</span>
                </div>

              </div>
            </Link>
          </div>
          <div className={styles.NavbarBoxRight}>
            <div className={styles.MenuBox}>
              <Link href='https://vendor.flairmyevent.com/account-settings/Feeds/' style={{ textDecoration: 'none' }}>
              <div className={styles.MenuItem}>
                  <small><FiPlus/></small>  <span>Create</span>
                </div>
                </Link>
            </div>
          </div>
        </div>
      </div>

      {isLoading &&
        <div>
          <Skeleton variant="rectangular" height={150} />
        </div>
      }

      {!isLoading &&
        <div className={styles.FeedBoxmain}>
          <div className={styles.FeedBox}>
            {Retdata.map((item, index) => {
              return <div className={styles.ReelsItem} key={index}>
                <VideoPlayer src={`${FeedVideoUrl}${item.videoid}`} BackDropClose={BackDropClose} BackDropOpen={BackDropOpen} />
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