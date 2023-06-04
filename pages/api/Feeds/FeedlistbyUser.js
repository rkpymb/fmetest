import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Feeds/FeedlistbyUser.php`, { updatekey: process.env.MYKEY, VendorMobile: req.body.VendorMobile })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}