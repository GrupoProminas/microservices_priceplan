/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';

const {Promotions} = models;

import mongoose from "mongoose";

const getPromotions = (req, res) => {

    req.query.where._id = mongoose.Types.ObjectId(req.params._id.toString());
    /**
     * Find all registers of Promotions collection
     */
    Promotions
        .findOne(
            req.query.where
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

export default getPromotions;