import { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import styles from '../../styles/Home.module.css'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router'
const EditProfile = ({ Data, BackDropOpen, BackDropClose }) => {
    const router = useRouter()
    const [UserMobile, setUserMobile] = useState(Data.mobile)
    const [Name, setName] = useState(Data.name)
    const [Email, setEmail] = useState(Data.email)
    const [Isalert, setIsalert] = useState(false)
    const [AlertText, setAlertText] = useState('')

    const CName = () => {
        setIsalert(false);
        setAlertText('')
        const Namex = document.querySelector('#Name').value
        setName(Namex)
    }
    const CEmail = () => {
        setIsalert(false);
        setAlertText('')
        const Emailx = document.querySelector('#Email').value
        setEmail(Emailx)
    }

    const handleSubmit = async () => {
        if (Name !== '' && Email !== '') {
            BackDropOpen()
            const sendUM = { UserMobile: UserMobile, Name: Name,Email: Email}
            const data = await fetch("/api/EditProfile", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    BackDropClose()
                    if (parsed.statusdata == true) {
                        setIsalert(true);
                        setAlertText(parsed.dataret)
                        setTimeout(function () {
                            setIsalert(false);
                            router.push('/Account')
                        }, 2000); 
                    } else {
                        setIsalert(true);
                        setAlertText(parsed.dataret)
                        setTimeout(function () {
                            setIsalert(false);
                        }, 2000); 
                    }
                })

        } else {
            BackDropClose()
            setIsalert(true);
            setAlertText('All Fields are required')
        }


    }
  return (
    <div>
          <div className={styles.LoginBox_input}>
              <TextField fullWidth label="Your Good Name" id="Name" onChange={CName} value={Name} />
          </div>
          <div className={styles.LoginBox_input}>
              <TextField fullWidth label="Email Address" id="Email"  onChange={CEmail} value={Email} />
          </div>
          {Isalert && (
              <Stack className={styles.LoginBox_input} style={{ marginTop: '10px' }}>

                  <Alert severity="warning">{AlertText}</Alert>

              </Stack>
          )}
          <div className={styles.LoginBox_inputBox}>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>
                  Update Details
              </Button>

          </div>
    </div>
  )
}

export default EditProfile
