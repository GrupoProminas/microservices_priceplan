/* eslint-disable id-length */
import {models, Types} from 'mongoose';

const {Vouchers} = models;

const updateVouchers = async (req, res) => {

    if (req.body.isActive === '' || req.body.isActive === undefined) delete req.body.isActive;
    if (req.body.userType === 'system') delete req.body.cpf;

    const update = {
        $set: req.body,
        $unset: {}
    };

    if (!('_courseId' in req.body) || !req.body._courseId) update.$unset._courseId = 1; else update.$set.tags = [];
    if (req.body.userType === 'system') update.$unset.cpf = 1;

    if (Object.keys(update.$set).length === 0) delete update.$unset;

    return Vouchers
        .findOneAndUpdate(
            {_id: Types.ObjectId(req.params._id)},
            update
        )
        .then(updated => res.api.send(updated, res.api.codes.OK))
        .catch(err => res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR));
};

export default updateVouchers;
