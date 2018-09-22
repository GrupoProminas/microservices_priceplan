/* eslint-disable id-length */
import {models} from 'mongoose';
const {Rates} = models;

const createRates = (req, res) => {

    // Create new rates by req.body data
    Rates
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createRates;