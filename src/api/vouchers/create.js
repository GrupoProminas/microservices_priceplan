/* eslint-disable id-length */
import {models} from 'mongoose';
const {Vouchers} = models;

const createVouchers = (req, res) => {

    Vouchers
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createVouchers;