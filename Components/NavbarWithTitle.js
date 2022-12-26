import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from 'next/router'
const Navbar = ({ Title }) => {
    const router = useRouter()
    return (
        <div className={styles.Navbar_WithTitle}>
            <div className={styles.NavbarBox_WithTitle}>
                <div style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => router.back()}>
                    <FiArrowLeft />
                </div>
                <div style={{marginLeft: '10px', marginTop: '-5px'}}>{Title}</div>
               
            </div>
        </div>
    )
}

export default Navbar
