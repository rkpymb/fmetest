import Head from 'next/head'
import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'


import * as animationData from '../Data/Lottie/113015-contact-us.json'


import CheckloginContext from '../context/auth/CheckloginContext'
import { BASE_URL, AppName } from '../Data/config'
export default function Home({ BackDropOpen, BackDropClose }) {
    const Contextdata = useContext(CheckloginContext)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <>
            <Navbar />
            <Head>
                <title>Shipping and Delivery{AppName}</title>
                <meta name="description" content="Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/fevicon.png" />
                <link rel='manifest' href='/manifest.json' />
            </Head>

            <div className={styles.Container}>
                <div style={{ minHeight: '100vh' }}>
                    <h1>Shipping and Delivery , Pricing range</h1>

                    Order processing and shipping time
                    <p>
                        Flair My Event is established with the aim of bringing a variety of artists under one roof and making all types of events successful no matter whether it is big or small.
                    </p>
                    <p>
                        Flair My Event Procces Subscription or Booking orders withing 24 hr.
                    </p>

                    Price Range
                    <p>
                        we have customised pricing according to the services proided by us. The details are provided to you beforehand according to the effort, efficiency and the output of the service. Typically the range of transactions on our website varies from INR 100 to 20000.
                    </p>
                    Schedule of payment
                    <p>
                        Some of our services can be utilised for fixed durations. In such cases, it is clearly mentioned within the description of these services. The period of usage in these cases vary from 1 month to 1 year.
                    </p>
                    Price Matching
                    <p>
                        At flairmyevent, we are committed to offering you the best possible prices. We will be glad to meet our competitor’s pricing if you ever find an item that we offer, in the same color and size, available from a similar retailer.
                    </p>
                    <p>
                        We are unable to match prices from auction and outlet stores or websites, as well as other retailers’ discount promotions, shipping offers and gift card offers.
                    </p>
                    Sale Adjustment
                    <p>
                        We work hard to ensure the accuracy of pricing. Despite our efforts, pricing errors may still occur. If an item’s price is higher than the price displayed, we will cancel your order of that item and notify you of the cancellation.
                    </p>
                    Shopping Cart
                    <p>
                        Items in your Shopping Cart reflect the current price displayed on the item’s product details page. Please note: This price may differ from the price displayed when the item was first placed in your Shopping Cart.
                    </p>
                    <p>
                        Our merchandise/service is offered for sale by flairmyevent for your personal enjoyment and not for resale. Therefore, we reserve the right to refuse to sell to any person whom we believe may be purchasing for resale.
                    </p>
                    <p>
                        Our Customer Service Specialists are ready to assist you—simply email at contact@flairmyevent.com. 24 hours a day.
                    </p>
                </div>
               
            </div>
            
            <Footer />
        </>
    )
}
