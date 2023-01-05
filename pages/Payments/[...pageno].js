import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Alert from '@mui/material/Alert';
const Slug = (props) => {
    const router = useRouter();
    const [OrderID, setOrderID] = useState(props.ID);
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [Loader, setLoader] = useState(true);
    const [Alertbox, setAlertbox] = useState(false);
    const [AlertboxText, setAlertboxText] = useState('');
    const [RazorpayOrderid, setRazorpayOrderid] = useState('');
    const [DataOrderid, setDataOrderid] = useState('');

    useEffect(() => {
        const handleSubmit = async () => {
            const sendUM = { OrderID }
            const data = await fetch("/api/PaymentOrderData", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    setAlertbox(true)
                    if (parsed.statusdata == true) {
                        setAlertboxText('Order ID :' + OrderID + ' please wait..')
                        makePayment(parsed.dataRet.Orderid, parsed.dataRet.amt, parsed.dataUser.name, parsed.dataUser.email, parsed.dataUser.mobile);
                        setIsLoading(false)
                       
                    } else {
                        setLoader(false)
                        setAlertboxText(parsed.dataRet)
                        setIsLoading(false)
                        // console.log(parsed.dataRet)
                    }
                   
                   
                })
        }
        handleSubmit()
    }, [router.query])


    const makePayment = async (dataOrderid, amt, name, email, mobile) => {
        setAlertboxText('Order ID :' + OrderID + ' please do not refresh while you are processing pyament')
        setLoader(true)
        setIsLoading(true)
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const sendUM = amt
        const data = await fetch("../api/razorpay", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })

        setRazorpayOrderid(data.id)
        var options = {
            key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            name: "Flair my Event",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: 'ORG OrderID : ' + dataOrderid,
            image: "https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_2/Razorpay_1642012341.jpg",
            handler: function (response) {
                // Validate payment at server - using webhooks is a better idea.
                if (response.razorpay_order_id !== '') {
                    setAlertboxText('Verifying Payment Details. please wait..')
                    UpdateOrder(response, dataOrderid)
                }
            },
            prefill: {
                name: name,
                email: email,
                contact: mobile,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            document.body.appendChild(script);

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };

            document.body.appendChild(script);
        });
    };

//  Update Order 
    const UpdateOrder = async (ee, dataOrderid) => {
        setIsLoading(true)
       
        // console.log(dataOrderid)
        const PAYMENTID = ee.razorpay_payment_id
        const razorpay_order_id = ee.razorpay_order_id
        // console.log(PAYMENTID)
        // console.log(razorpay_order_id)

        const sendRegUpdate = { Paymentid: PAYMENTID, refid: razorpay_order_id, Orderid: dataOrderid }
        const dataUpdate = await fetch("/api/UpdateSubscriptionOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendRegUpdate)
        }).then((b) => {
            return b.json();
        })
            .then((parsedUpdateorder) => {
                // console.log(parsedUpdateorder)
                if (parsedUpdateorder.statusdata == true) {
                    setAlertboxText('Payment Successfully Received. please wait..')
                    alert(parsedUpdateorder.dataRet)
                    window.location.href = `https://fmevendorpanel.vercel.app/`; 
                   
                } else {
                    alert(parsedUpdateorder.dataRet)
                }
            })


    }
    return <div>
        <Head>
            <title>Subscription Payment {props.ID} : Payment</title>
        </Head>
        <div className={styles.container}>
            {isLoading &&
                <div style={{minHeight:'100vh'}} >
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                    <div style={{ margin: '20px' }} >
                        <Skeleton variant="rectangular" height={50} />
                    </div>
                </div>
            }
            {!isLoading &&
                <div style={{minHeight:'100vh',display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}} >
                    {Alertbox &&
                        <Alert severity="info">{AlertboxText}</Alert>
                    }
                    {Loader && (
                        <div style={{margin: '20px' }}>
                            <CircularProgress />
                        </div>

                    )}
                </div>
            }
        </div>
        
    </div>
};

export async function getServerSideProps(context) {
    const ID = context.query.pageno[0];
    return {
        props: { ID }, // will be passed to the page component as props
    }
}


export default Slug;