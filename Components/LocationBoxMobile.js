import { useState, useEffect, useContext } from 'react';
import styles from '../styles/Home.module.css'
import LocationBox from './LocationBox'
const LocationBoxMobile = ({ BackDropOpen, BackDropClose }) => {


    return (
        <div className={styles.mob_footer_menu}>

            <LocationBox BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />

        </div>
    )
}

export default LocationBoxMobile
