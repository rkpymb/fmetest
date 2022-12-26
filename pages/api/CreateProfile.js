import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/CreateProfile.php`, { updatekey: process.env.MYKEY, mob: req.body.MobileNum, NameUser: req.body.UserName, Emailid: req.body.UserEmail, GenderSelected: req.body.Gender })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}