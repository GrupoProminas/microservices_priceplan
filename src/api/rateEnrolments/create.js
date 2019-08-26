import {models} from 'mongoose';

const {RatesEnrolments} = models;

const createRate = (req, res) => {

    RatesEnrolments
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createRate;