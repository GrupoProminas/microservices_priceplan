/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';
const {Vouchers} = models;

const getVouchers = (req, res) => {

    /**
     * Find all registers of Model collection
     */
    Vouchers
        .findById(req.params._id, req.query.project)
        .populate(req.query.populate)
        .then(result => {
            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default getVouchers;