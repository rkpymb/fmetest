import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import { BASE_URL, AppName } from '../../Data/config'
import Image from 'next/image'
import Link from 'next/link'
import Skeleton from '@mui/material/Skeleton';
import { SlInfo, SlLocationPin, SlCheck } from "react-icons/sl";
import NavbarWithTitle from '../../Components/NavbarWithTitle'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Lottie from 'react-lottie';
import * as animationData from '../../Data/Lottie/46690-calendar-booking.json'
const Slug = ({ PlanData, BackDropClose, BackDropOpen }) => {

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [PData, setPData] = useState(PlanData);
    const [Address, setAddress] = useState('');
    const [CityNameData, setCityNameData] = useState('');
    const [PincodeData, setPincodeData] = useState('');
    const [StateName, setStateName] = useState('');
    const [DateValue, setDateValue] = React.useState(dayjs());
    const [TimeValue, setTimeValue] = React.useState(dayjs());
    const [isalert, setIsalert] = useState(false);
    const [ShowDone, setShowDone] = useState(false);
    const [AlertText, setAlertText] = useState('');
    const [UserMobNow, setUserMobNow] = useState('');
    const [BookingID, setBookingID] = useState('');
    const [PageTite, sePageTite] = useState('Booking  for : '+PData.RetData.Title);
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setValue(newValue);
    };
   



    const ChangeAddress = () => {
        setIsalert(false);
        setAlertText('')
        const AddressA = document.querySelector('#Address').value
        setAddress(AddressA)

    }

    const SendBooking = async () => {
        if (Address !== '') {
            BackDropOpen()
            const VendorMobile = PData && PData.RetData.VendorMobile;
            const UserMob = UserMobNow;
            const PlanID = PData && PData.RetData.id;
            const BookingDateTime = value ;
            const CityName = CityNameData;
            const Pincode = PincodeData;
            const FullAddress = Address + ', ' + Pincode;
            const sendReg = { VendorMobile: VendorMobile, UserMob: UserMob, PlanID: PlanID, BookingDateTime: BookingDateTime, CityName: CityName, Pincode: Pincode, FullAddress: FullAddress }
            const data = await fetch("/api/CreateBooking", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendReg)
            }).then((b) => {
                return b.json();
            })
                .then((parsedBooked) => {
                    if (parsedBooked.statusdata == true) {
                        sePageTite('Booking Successful ☑️')
                        BackDropClose()
                        setShowDone(true)
                        setBookingID(parsedBooked.dataret)

                    } else {
                        BackDropClose()
                        setIsalert(true);
                        setAlertText('Something Went Wrong, Try Again !')
                    }

                })
        } else {
            setIsalert(true);
            setAlertText('Please Provide all required details')
        }


    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    useEffect(() => {

        try {
            if (localStorage.getItem('Pincode') && localStorage.getItem('userid')) {
                const PincodeNow = localStorage.getItem('Pincode');
                const StateNow = localStorage.getItem('State');
                const CityNow = localStorage.getItem('City');
                const userid = localStorage.getItem('userid');
                setPincodeData(PincodeNow)
                setStateName(StateNow)
                setCityNameData(CityNow)
                setUserMobNow(userid)
                setIsLoading(false)

            } else {

            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
    });

    return <div>
        <NavbarWithTitle Title={PageTite} />
        <Head>
            <title>{PData && PData.RetData.Title} : {AppName}</title>
            <meta name="description" content={PData && PData.RetData.Details} />
        </Head>
        {!ShowDone &&
            <div>
                <div style={{ backgroundColor: '#9b89ff' }}>
                    <div style={{ textAlign: 'center', padding: '5px', color: 'white' }}><span>Procced to Book &
                        <span style={{ fontWeight: 500, }}> SAVE ₹{PData.RetData.MainPrice - PData.RetData.SalePrice} </span>
                        today </span></div>
                </div>
                <div style={{ backgroundColor: 'white' }}>

                    <div className={styles.Container}>
                        <div className={styles.PlanDatabox}>
                            <div className={styles.PlanDataboxA}>
                                <div className={styles.PlanDataboxDetails}>
                                    {isLoading &&
                                        <div>
                                            <Skeleton variant="rectangular" width={'100%'} height={100} />
                                            <Skeleton variant="rectangular" width={'100%'} height={100} />
                                            <Skeleton variant="rectangular" width={'100%'} height={100} />
                                        </div>
                                    }
                                    {!isLoading &&
                                        <div>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                                                    <TableBody>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Boking Plan Title
                                                            </TableCell>
                                                            <TableCell align="right">{PData && PData.RetData.Title}</TableCell>

                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Plan Details
                                                            </TableCell>
                                                            <TableCell align="right">{PData && PData.RetData.Details}</TableCell>

                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Price
                                                            </TableCell>
                                                            <TableCell align="right">₹{PData && PData.RetData.MainPrice}</TableCell>

                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Discount
                                                            </TableCell>
                                                            <TableCell align="right">-₹{PData.RetData.MainPrice - PData.RetData.SalePrice}</TableCell>

                                                        </TableRow>
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Total
                                                            </TableCell>
                                                            <TableCell align="right">₹{PData && PData.RetData.SalePrice}</TableCell>

                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            <div>
                                                <div style={{ height: '30px' }}></div>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <Stack spacing={3}>

                                                        <DateTimePicker
                                                            label="Select Booking Date & Time"
                                                            value={value}
                                                            onChange={handleChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                        <TextField fullWidth label="Enter Booking Address" id="Address" onChange={ChangeAddress} value={Address} />
                                                    </Stack>
                                                </LocalizationProvider>
                                                {isalert && (
                                                    <Stack style={{ marginTop: '10px' }}>

                                                        <Alert severity="warning">{AlertText}</Alert>

                                                    </Stack>
                                                )}
                                                <div style={{ height: '20px' }}></div>
                                                <Button variant="contained" onClick={SendBooking} className={styles.BookingBTN}>Confirm Booking</Button>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        }
        {ShowDone &&
            <div>
                <div style={{ backgroundColor: 'green' }}>
                    <div style={{ textAlign: 'center', padding: '5px', color: 'white' }}><span>Total Saved on this Booking
                        <span style={{ fontWeight: 500, }}> ₹{PData.RetData.MainPrice - PData.RetData.SalePrice} </span>
                    </span></div>
                </div>
                <div style={{ backgroundColor: 'white' }}>
                    <div className={styles.Container}>
                        <div className={styles.LoginHeroBoxB}>
                            <Lottie options={defaultOptions}
                                height={200}
                                width={200}
                                isStopped={false}
                                isPaused={false} />
                        </div>
                        <div className={styles.DoneBOXDATA}>
                            <div style={{ fontSize: 25,color:'black', }}>
                                <span>☑️ Booking Succesfully Created</span>
                            </div>
                            <div style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}>
                                <span>Booking ID : #{BookingID}</span>
                            </div>
                            <div style={{ fontSize: 15,color:'green' }}>
                                <span>You Booking Request is Successfully sent to Rajkumar. your order will be confirmed shortly.</span>
                            </div>
                            <div style={{ fontSize: 15, color: 'green' }}>
                                <span>Wait for a few minutes. we will keep updated you regarding status of this Booking, please Check your Email for more details. Thank you </span>
                            </div>
                            <div style={{ height: '20px' }}></div>
                            <Button variant="contained" onClick={() => router.push('/')}>Visit Home Page</Button>
                        </div>
                    </div>
                </div>
            </div>

        }

        <div style={{ height: '30px' }}></div>



    </div>
};

export async function getServerSideProps(context) {
    const PlanID = context.query.pageno[0];
    const KEY = process.env.MYKEY

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ PlanID: PlanID, updatekey: KEY })
    };
    const response = await fetch(`${process.env.API_URL}Website/BookingPlanDetails.php`, requestOptions);
    const PlanData = await response.json();
    return {
        props: { PlanData }, // will be passed to the page component as props
    }

}


export default Slug;