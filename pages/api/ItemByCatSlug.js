import axios from 'axios';
export default function handler(req, res) {
    if (req.method === 'POST') {
        axios.post(`${process.env.API_URL}Website/ItemByCatSlug.php`, { updatekey: process.env.MYKEY, city: req.body.city, CatSlug: req.body.CatSlug })
            .then((rest) =>
                res.status(200).json(rest.data));
    } else {

    }
}