import {models} from 'mongoose';

const {Products} = models;

const updateProduct = (req, res) => {

    Products
        .findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {new: true}
        )
        .then(updated => {
            if (!updated) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(updated, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default updateProduct;