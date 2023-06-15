import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../../styles/Home.module.css'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import ContactBox from '../../Components/HomePage/ContactBox'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import Image from 'next/image'
import { BASE_URL, AppName } from '../../Data/config'
import { useRouter } from 'next/router'
import { SlLocationPin, SlInfo } from "react-icons/sl";
const Slug = ({ CatSlug, BackDropClose, BackDropOpen }) => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const [CurrentCity, setCurrentCity] = useState('');
    
    useEffect(() => {
        setIsLoading(true)
        const SearchVendor = async () => {
            try {
                if (localStorage.getItem('City')) {
                  
                    const CityNow = localStorage.getItem('City');
                   
                    setCurrentCity(CityNow)
                    const sendUM = { city: CityNow, CatSlug: CatSlug }
                    const data = await fetch("/api/ItemByCatSlug", {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(sendUM)
                    }).then((a) => {
                        return a.json();
                    })
                        .then((parsed) => {
                            setIsLoading(false)
                           
                            if (parsed.statusdata == true) {
                                setRetdata(parsed.RetData)
                                setShowData(true)
                            } else {
                                setShowData(false)

                            }

                        })

                } else {
                    setShowData(false)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error)
                // localStorage.clear()
            }

        }
        SearchVendor()


    }, [router.query])
    return <>
        <Navbar BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
        <Head>
            <title>Category {CatSlug} : {AppName}</title>
            <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        

        <div className={styles.Container} style={{minHeight: "100vh"}}>

            {isLoading &&
                <div>
                    <div style={{ height: '30px' }}></div>
                    <div className={styles.VendorGrid}>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>
                        <div className={styles.VendorGridItem}>
                            <Skeleton variant="rounded" className={styles.VendorGridItem_loader} height={270}/>
                        </div>

                    </div>
                </div>
            }
            {!isLoading &&

                <div>
                    <div className={styles.TitleBTNHeader}>
                        <div className={styles.TitleBTNHeaderText}>
                            <span style={{ fontWeight: 500, fontSize: '20px' }}>{Retdata.length} {CatSlug} available in {CurrentCity}</span>
                        </div>

                    </div>
                    <div style={{ height: '10px' }}></div>
                    <div className={styles.VendorGrid}>
                        {Retdata.map((item) => {
                            return <Link href={`/Profile/${item.username}`} className={styles.VendorGridItem} style={{ textDecoration: 'none' }}>
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "250px",
                                        backgroundColor: '#c5d6e3',
                                    }}
                                >
                                    <Image src={`${BASE_URL}Storage/panel/Vendorsdp/${item.dp}`} alt="Vercel Logo" layout="fill" />
                                </div>
                                <div className={styles.FeelListHData}>
                                    <div className={styles.FeelListHDataFlexTitle}><span style={{ fontWeight: '500' }}>{item.name}</span></div>
                                    <div className={styles.FeelListHDataFlex}>
                                        <div className={styles.FeelListHDataFlexItem}>
                                            <div><span><SlLocationPin /></span></div>
                                            <div style={{ marginTop: '-3px', marginLeft: '5px' }}><span>{item.city}</span></div>
                                        </div>
                                        <div className={styles.FeelListHDataFlexItem}>
                                            <div><span><SlInfo /></span></div>
                                            <div style={{ marginTop: '-3px', marginLeft: '5px' }}><span>{item.mainCategory}</span></div>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        }

                        )}
                    </div>

                </div>
            }
        </div>
       
       
        <div style={{ height: '30px' }}></div>
        <div className={styles.ContainerDesktopShowbg_Contact}>
            <div className={styles.Container}>
                <ContactBox />
            </div>
        </div>
        <Footer />
    </>
};

export async function getServerSideProps(context) {
    const CatSlug = context.query.pageno[0];
    return {
        props: { CatSlug }, // will be passed to the page component as props
    }

}


export default Slug;