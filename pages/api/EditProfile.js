import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
      
        axios.post(`${process.env.API_URL}Website/User/EditProfile.php`, { updatekey: process.env.MYKEY, UserMobile: req.body.UserMobile, Name: req.body.Name, Email: req.body.Email })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {
        // Handle any other HTTP method
    }
} 