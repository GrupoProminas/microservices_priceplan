/* eslint-disable id-length */
import {models} from 'mongoose';
const {Prices} = models;

const updatePrices =  (req, res) => {

    // Create new prices by req.body data
    Prices
        .update(
            {
                _id: req.params._id
            },
            {
                $set: req.body
            }
        )
        .then(update => {
            return res.api.send(update, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default updatePrices;