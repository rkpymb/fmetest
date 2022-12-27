import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/GetVendorProfile.php`, { updatekey: process.env.MYKEY, UserName: req.body.UserName })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}