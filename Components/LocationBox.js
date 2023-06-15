import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import { BiCurrentLocation } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Lottie from 'react-lottie';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import * as animationData from '../Data/Lottie/85354-location.json'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';

const LocationBox = ({ BackDropOpen, BackDropClose }) => {
    const router = useRouter()
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const [Pincode, setPincode] = useState('');
    const [CityName, setCityName] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [AlertText, setAlertText] = useState('');
    
    const [CurrentCity, setCurrentCity] = useState('');
   
    const [PincodeFound, setPincodeFound] = useState(false);
  
    const handleCityName = () => {
        setIsalert(false);
        setAlertText('')
        const CityNamex = document.querySelector('#CityName').value
        setCityName(CityNamex)
    }

    const OpenDR = () => {
        setOpenDrawer(true);

    }
    const CloseDR = () => {
        setOpenDrawer(false);

    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const CheckCity = async () => {
        if (CityName !== '') {
            BackDropOpen()
            localStorage.setItem('City', CityName);
            setTimeout(function () {
                CloseDR()
                router.push('/')
            }, 1000);
        } else {
            BackDropClose()
            setIsalert(true);
            setAlertText('Please enter Valid City Name')
        }


    }
    // Tab
   


    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('City')) {
                const CityNow = localStorage.getItem('City');
                setCurrentCity(CityNow)
                setCityName(CityNow)
                setPincodeFound(true)
                
            } else {
                OpenDR()
                
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    }, [router.query]);
    return (
        <div>
            
            <div className={styles.NavLocationText} onClick={OpenDR}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '20px' }}>
                        <span><BiCurrentLocation /></span>
                    </div>

                    <div style={{ marginTop: '-2px', marginLeft: '5px', fontSize: '12px' }}>
                        {PincodeFound &&
                            <span>{CurrentCity}</span>
                        }
                        {!PincodeFound &&
                            <span>Set Your Search Location, Click here</span>
                        }
                    </div>
                </div>
                <div>
                    <span><FiChevronRight /></span>
                </div>
            </div>
            
            <div>
                <SwipeableDrawer
                    anchor='bottom'
                    open={OpenDrawer}
                    onClose={CloseDR}
                    onOpen={OpenDR}
                    className={styles.SwipeableDrawer}
                >
                    <div className={styles.Container}>
                        <div style={{ padding: '10px' }}>
                            <div className={styles.LocationFlex}>
                               
                                <div>
                                    <Lottie options={defaultOptions}
                                    isStopped={false}
                                        isPaused={false} />
                                </div>
                                <div style={{margin: '10px' }}>
                                    <span style={{ fontSize: '30px' }}>Find Arround You !</span>
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <div>
                                            <div style={{ marginTop: '10px' }}>
                                                <TextField fullWidth label="Enter City Name" id="CityName" autoFocus onChange={handleCityName} value={CityName} />
                                            </div>
                                            {isalert && (
                                                <Stack style={{ marginTop: '10px' }}>

                                                    <Alert severity="warning">{AlertText}</Alert>

                                                </Stack>
                                            )}
                                            <div style={{ marginTop: '10px' }}>
                                                <Button variant="contained" endIcon={<SendIcon />} fullWidth onClick={CheckCity}>
                                                    Set Location
                                                </Button>

                                            </div>
                                        </div>
                                    </Box>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
        </div>
    )
}

export default LocationBox
