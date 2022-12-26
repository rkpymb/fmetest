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
const LocationBox = ({ BackDropOpen, BackDropClose }) => {
    const router = useRouter()
    const [OpenDrawer, setOpenDrawer] = useState(false);
    const [Pincode, setPincode] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [AlertText, setAlertText] = useState('');
    const [CurrentPincode, setCurrentPincode] = useState('');
    const [CurrentCity, setCurrentCity] = useState('');
    const [CurrentState, setCurrentState] = useState('');
    const [PincodeFound, setPincodeFound] = useState(false);
    const handlePincode = () => {
        setIsalert(false);
        setAlertText('')
        const PincodeXX = document.querySelector('#Pincode').value
        setPincode(PincodeXX)
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

    const CheckPincode = async () => {
        if (Pincode !== '') {
            BackDropOpen()
            const sendUM = { Pincode }
            const data = await fetch("/api/CheckPincode", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsedPincode) => {
                   
                    console.log(parsedPincode)
                    if (parsedPincode == 'no') {
                        BackDropClose()
                        setIsalert(true);
                        setAlertText('Invalid Pincode')
                    } else {
                        localStorage.setItem('City', parsedPincode.city);
                        localStorage.setItem('State', parsedPincode.state);
                        localStorage.setItem('Pincode', Pincode);
                        setTimeout(function () {
                            CloseDR()
                            router.push('/')
                        }, 1000);
                    }
                })

        } else {
            BackDropClose()
            setIsalert(true);
            setAlertText('Please enter Valid Pincode')
        }


    }

    useEffect(() => {
        // check login
        try {
            if (localStorage.getItem('Pincode')) {
                const PincodeNow = localStorage.getItem('Pincode');
                const StateNow = localStorage.getItem('State');
                const CityNow = localStorage.getItem('City');
                setCurrentPincode(PincodeNow)
                setPincode(PincodeNow)
                setCurrentState(StateNow)
                setCurrentCity(CityNow)
                setPincodeFound(true)
            } else {
                OpenDR()
                setPincodeFound(false)
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    }, [router.query]);
    return (
        <div>
            {PincodeFound && 
            <div className={styles.NavLocationText} onClick={OpenDR}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '20px' }}>
                        <span><BiCurrentLocation /></span>
                    </div>

                    <div style={{ marginTop: '-2px', marginLeft: '5px', fontSize: '12px' }}>
                            <span>{CurrentCity}, {CurrentState}, {CurrentPincode}</span>
                    </div>
                </div>
                <div>
                    <span><FiChevronRight /></span>
                </div>
            </div>
            }
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
                                    <span style={{fontSize: '30px'}}>Find Arround You !</span>
                                    <div>
                                        <div style={{marginTop: '10px'}}>
                                            <TextField fullWidth label="Enter Pincode" type="number" id="Pincode" autoFocus onChange={handlePincode} value={Pincode} />
                                        </div>
                                        {isalert && (
                                            <Stack  style={{ marginTop: '10px' }}>

                                                <Alert severity="warning">{AlertText}</Alert>

                                            </Stack>
                                        )}
                                        <div style={{ marginTop: '10px' }}>
                                            <Button variant="contained" endIcon={<SendIcon />} fullWidth onClick={CheckPincode}>
                                                Set Location
                                            </Button>

                                        </div>
                                    </div>
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
