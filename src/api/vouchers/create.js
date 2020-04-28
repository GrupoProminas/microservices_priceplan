/* eslint-disable id-length,quotes,prefer-destructuring */
import {models} from 'mongoose';
import CodeVoucherService from "../../services/CodeVoucher.service";
const {Vouchers} = models;

const createVouchers = (req, res) => {

    let code = null;

    if ('code' in req.body) {
        code = req.body.code;
    }

    CodeVoucherService.generateVoucher(6, code)
        .then(result => {
            req.body.code = result;

            console.log('>>>', req.body);

            return Vouchers.create(req.body);
        })
        .then(result => {
            return res.api.send(result, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createVouchers;
