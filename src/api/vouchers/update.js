/* eslint-disable id-length */
import {models} from 'mongoose';

const {Vouchers} = models;

const updateVouchers = async (req, res) => {

    try {
        const voucher = await Vouchers.findById(req.params._id);

        voucher.overwrite(req.body);

        await voucher.save();

        return res.api.send(voucher, res.api.codes.OK);

    } catch (err) {
        return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
    }
};

export default updateVouchers;
