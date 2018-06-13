/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';
const {ProductTypes} = models;

const getProductTypes = (req, res) => {

    return ProductTypes
        .findById(
            req.params._id
        )
        .then(artist => {
            if (!artist) return res.api.send(null, res.api.codes.OK);

            return res.api.send(artist, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default getProductTypes;