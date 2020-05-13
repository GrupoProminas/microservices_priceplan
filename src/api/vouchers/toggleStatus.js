import {models} from 'mongoose';

const { Vouchers } = models;

export default async (req, res) => {

    try {
        const voucher = await Vouchers.findById(req.params._id);

        voucher.isActive = !voucher.isActive;

        const updated = await voucher.save();

        return res.api.send(updated, res.api.codes.OK);
    } catch(err) {
        return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
    }
}
