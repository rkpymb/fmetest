import React from 'react'
import styles from '../../styles/Home.module.css'
import { BsWhatsapp } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineAlternateEmail } from "react-icons/md";
const ContactBox = () => {
  return (
    <div style={{ padding: '10px', color: 'white' }}>
     
      <div className={styles.ContactHomeBox}>
        <div className={styles.ContactHomeItem}>
          <div className={styles.ContactIcon}><BsWhatsapp/></div>
          <div>Chat With us</div>
          <div className={styles.ContactText}>+91 971704150</div>
        </div>
        <div className={styles.ContactHomeItem}>
          <div className={styles.ContactIcon}><IoCallOutline /></div>
          <div>Talk With us</div>
          <div className={styles.ContactText}>+91 971704150</div>
        </div>
        <div className={styles.ContactHomeItem}>
          <div className={styles.ContactIcon}><MdOutlineAlternateEmail /></div>
          <div>Write to us</div>
          <div className={styles.ContactText}>contact@flairmyevent.com</div>
        </div>
      </div>
     
    </div>
  )
}

export default ContactBox
