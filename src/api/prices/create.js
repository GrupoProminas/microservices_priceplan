/* eslint-disable id-length */
import {models} from 'mongoose';
const {Prices} = models;

const createPrice = (req, res) => {

    // Create new prices by req.body data
    Prices
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createPrice;