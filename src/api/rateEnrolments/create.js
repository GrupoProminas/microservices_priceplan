import {models} from 'mongoose';

const {RateEnrolments} = models;

const createRate = (req, res) => {

    RateEnrolments
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createRate;