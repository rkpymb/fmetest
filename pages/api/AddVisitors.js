import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
      
        axios.post(`${process.env.API_URL}Website/AddVisitors.php`, { updatekey: process.env.MYKEY, VendorMobile: req.body.VendorMobile, UserMobile: req.body.UserMobile })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {
        // Handle any other HTTP method
    }
} 