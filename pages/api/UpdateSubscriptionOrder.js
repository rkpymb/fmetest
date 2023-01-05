import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request - Example:

        axios.post(`${process.env.API_URL}UpdateSubscriptionOrder.php`, { updatekey: process.env.MYKEY, Orderid: req.body.Orderid, Paymentid: req.body.Paymentid, refid: req.body.refid })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {
        // Handle any other HTTP method
    }
}