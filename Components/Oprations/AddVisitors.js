import { useState, useEffect, useContext } from 'react';
const AddVisitors = ({ UserMobile, VendorMobile }) => {
    useEffect(() => {
        handleSubmit()
    }, [])
    const handleSubmit = async () => {
        const sendUM = { VendorMobile: VendorMobile, UserMobile: UserMobile }
        const data = await fetch("/api/AddVisitors", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                // alert(parsed.RetData)
            })
    }
    
    
    return (
        <div>
          
        </div>
    )
}

export default AddVisitors
