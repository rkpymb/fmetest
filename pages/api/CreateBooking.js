import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/CreateBooking.php`, { updatekey: process.env.MYKEY, VendorMobile: req.body.VendorMobile, UserMob: req.body.UserMob, PlanID: req.body.PlanID, BookingDateTime: req.body.BookingDateTime, CityName: req.body.CityName, Pincode: req.body.Pincode, FullAddress: req.body.FullAddress })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}