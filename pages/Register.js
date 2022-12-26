import Head from 'next/head'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { BASE_URL, AppName } from '../Data/config'
import styles from '../styles/Home.module.css'
import NavbarWithTitle from '../Components/NavbarWithTitle'
import Lottie from 'react-lottie';
import TextField from '@mui/material/TextField';
import * as animationData from '../Data/Lottie/72874-user-profile-v2.json'
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CheckloginContext from '../context/auth/CheckloginContext.js'
import { useRouter } from 'next/router'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function Home({ BackDropOpen, BackDropClose }) {
    const router = useRouter()
    const Contextdata = useContext(CheckloginContext)
    const [usermobile, setMob] = useState('');
    const [UserName, setUserName] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [AlertText, setAlertText] = useState('');
    const [RegBox, setRegBox] = useState(true);
    const [valueGender, setValueGender] = useState('Female');
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    const ChangeName = () => {
        setIsalert(false);
        setAlertText('')
        const Name = document.querySelector('#Name').value
        setUserName(Name)
    }
  
    const ChangeEmail = () => {
        setIsalert(false);
        setAlertText('')
        const Email = document.querySelector('#Email').value
        setUserEmail(Email)
    }
    const handleChangeGender = (event) => {
        setValueGender(event.target.value);
        console.log(event.target.value)
    };

    // On submit mobile
    const handleSubmit = async () => {
        if (usermobile.length == 10 && UserName !=='' && UserEmail !=='' ) {
            BackDropOpen()
            const sendData = { MobileNum: usermobile, UserName: UserName, UserEmail: UserEmail, Gender: valueGender }
            const data = await fetch("/api/CreateProfile", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendData)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    localStorage.clear();
                    if (parsed.statusdata == true) {
                        localStorage.setItem('userid', usermobile);
                        setIsalert(true);
                        setAlertText(parsed.data)
                        setTimeout(function () {
                            router.push('/')
                        }, 1000);
                    } else {
                        BackDropClose()
                        setIsalert(true);
                        setAlertText(parsed.data)
                    }
                })

        } else {
            BackDropClose()
            setIsalert(true);
            setAlertText('Please enter correct Details')
        }


    }




    useEffect(() => {
        try {
            if (localStorage.getItem('OTPSTATUS') && localStorage.getItem('UserMobile')) {
                const userM = localStorage.getItem('UserMobile');
                setMob(userM)
            } else {
                router.push('/')
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    });
    return (
        <>
            <NavbarWithTitle Title={`Join ${AppName}`} />
            <Head>
                <title>Sign up : {AppName}</title>
                <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fevicon.png" />
            </Head>
            <div className={styles.Container}>
                <div style={{ padding: '10px' }}>
                    <div className={styles.LoginHeroBox}>
                        <div className={styles.LoginHeroBoxA}>
                            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Sign up</span>
                            <div>Please Enter required information</div>

                            <div className={styles.LoginBox_inputBox}>

                                {RegBox &&
                                    <div>
                                        <div className={styles.LoginBox_input}>
                                            <TextField fullWidth label="Create Account With" type="number" id="userm"  value={usermobile} />
                                        </div>
                                        <div className={styles.LoginBox_input}>
                                            <TextField fullWidth label="Your Name" id="Name" autoFocus  onChange={ChangeName} value={UserName} />
                                        </div>
                                        <div className={styles.LoginBox_input}>
                                            <TextField fullWidth label="Email ID" id="Email" onChange={ChangeEmail} value={UserEmail} />
                                        </div>
                                        <div className={styles.LoginBox_input}>
                                            <FormControl>
                                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={valueGender}
                                                    onChange={handleChangeGender}
                                                >
                                                    <FormControlLabel value="Memale" control={<Radio />} label="Female" />
                                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.LoginBox_inputBox}>
                                            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                                                Create Account
                                            </Button>

                                        </div>
                                    </div>


                                }
                               
                                {isalert && (
                                    <Stack className={styles.LoginBox_input} style={{ marginTop: '10px' }}>

                                        <Alert severity="warning">{AlertText}</Alert>

                                    </Stack>
                                )}
                            </div>


                        </div>
                        <div className={styles.LoginHeroBoxB}>
                            <Lottie options={defaultOptions}
                                height={200}
                                width={200}
                                isStopped={false}
                                isPaused={false} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
