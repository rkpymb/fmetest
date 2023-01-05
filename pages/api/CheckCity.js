import axios from 'axios';

export default function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body.Pincode)
        axios.post(`${process.env.API_URL}PincodeApi/CheckCity.php`, { CityName: req.body.CityName })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {
        // Handle any other HTTP method
    }
}  