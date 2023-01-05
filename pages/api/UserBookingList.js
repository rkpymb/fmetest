import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/User/BookingList.php`, { updatekey: process.env.MYKEY, UserMobile: req.body.dataid })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}