import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/HomeFeed.php`, { updatekey: process.env.MYKEY, pincode: req.body.pincode })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}