/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';
const {Prices} = models;

const getPrices =  (req, res) => {

    /**
     * Find all registers of Prices collection
     */
    Prices
        .findOne(
            req.query.where,
            req.query.project
        )
        .then(artist => {

            // If no have data send a not found response
            if (!artist) {
                return res.api.send(null, res.api.codes.OK);
            }

            return res.api.send(artist, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default getPrices;