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
export default function Home({ BackDropOpen, BackDropClose }) {
  const router = useRouter()
  const Contextdata = useContext(CheckloginContext)
  const [usermobile, setMob] = useState('');
  const [OTPTEXT, setOTPTEXT] = useState('');
  const [isalert, setIsalert] = useState(false);
  const [AlertText, setAlertText] = useState('');
  const [OtpBox, setOtpBox] = useState(false);
  const [MobileBox, setMobileBox] = useState(true);
  const [OTPvalue, setOTPvalue] = useState('');
  const [UserType, setUserType] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const handleChangeMob = () => {
    setIsalert(false);
    setAlertText('')
    const mobA = document.querySelector('#userm').value
    if (mobA.length <= 10) {
      setMob(mobA)
    }

  }
  const ChangeOTP = () => {
    setIsalert(false);
    setAlertText('')
    const OTPTEXT = document.querySelector('#OTPTEXT').value
    setOTPTEXT(OTPTEXT)
  }
  // On submit mobile
  const handleSubmit = async () => {
    if (usermobile.length == 10) {
      BackDropOpen()
      const sendUM = { usermobile }
      const data = await fetch("/api/mobile_process", {
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
            SndOTP()
            setUserType(parsed.result)
          } else {
            alert('Something went wrong')
          }
        })

    } else {
      BackDropClose()
      setIsalert(true);
      setAlertText('Please enter correct Mobile Number')
    }


  }


  const SndOTP = async () => {
    if (usermobile.length == 10) {
      const sendReg = { MobileNum: usermobile }
      const data = await fetch("/api/SendOTP", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(sendReg)
      }).then((b) => {
        return b.json();
      })
        .then((parsedOTP) => {
          BackDropClose()
          if (parsedOTP.statusdata == true) {
            setOTPvalue(parsedOTP.dataret)
            setMobileBox(false)
            setOtpBox(true)
            console.log(parsedOTP)
          } else {
            alert('Something Went Wrong')
          }
        })

    } else {
      BackDropClose()
      alert('Something Went Wrong')

    }


  }

  const VerifyOTP = async () => {
    if (OTPvalue == OTPTEXT) {
      BackDropOpen()
      if (UserType == true) {
        localStorage.setItem('userid', usermobile);
        setTimeout(function () {
          router.push('/')
        }, 1000);
      } else {
        localStorage.setItem('OTPSTATUS', true);
        localStorage.setItem('UserMobile', usermobile);
        setTimeout(function () {
          router.push('/Register')
        }, 1000);
      }


    } else {
      setIsalert(true);
      setAlertText('Invalid OTP')
      

    }

  }


  useEffect(() => {
    if (Contextdata.IsLogin == true) {
      router.push('/')
    } else {
      console.log('Not Login')
    }
  });
  return (
    <>
      <NavbarWithTitle Title={'Login'} />
      <Head>
        <title>Login : {AppName}</title>
        <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fevicon.png" />
      </Head>
      <div className={styles.Container}>
        <div style={{ padding: '10px' }}>
          <div className={styles.LoginHeroBox}>
            <div className={styles.LoginHeroBoxA}>
              <span style={{ fontSize: '30px', fontWeight: 'bold' }}>Login / Sign up</span>
              <div>Sign up with your phone number and get exclusive access to discounts and savings on {AppName} Bookings and with our many partners.</div>

              <div className={styles.LoginBox_inputBox}>

                {MobileBox &&

                  <div>
                    <div className={styles.LoginBox_input}>
                      <TextField fullWidth label="Enter Mobile Number" type="number" id="userm" autoFocus onChange={handleChangeMob} value={usermobile} />
                    </div>
                    <div className={styles.LoginBox_inputBox}>
                      <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                        Send OTP
                      </Button>

                    </div>
                  </div>

                }
                {OtpBox &&
                  <div>
                    <div>
                      <span>OTP Succesfully sent on <b>+91 {usermobile}</b></span>
                    </div>
                    <div className={styles.LoginBox_input}>
                      <TextField fullWidth label="Enter OTP" id="OTPTEXT" autoFocus type="number" onChange={ChangeOTP} value={OTPTEXT} />
                    </div>
                    <div className={styles.LoginBox_inputBox}>
                      <Button variant="contained" endIcon={<SendIcon />} onClick={VerifyOTP}>
                        Verify OTP
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
