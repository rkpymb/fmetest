import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}/vendor/SendOTP.php`, { updatekey: process.env.MYKEY, AdminIDmob: process.env.AdminIDmob, mob: req.body.MobileNum })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {
        // Handle any other HTTP method
    }
}  