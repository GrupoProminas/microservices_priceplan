/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';
const {Promotions} = models;

import mongoose from 'mongoose';

const getPromotions = (req, res) => {

    console.log(new mongoose.Types.ObjectId(req.params._id));

    /**
     * Find all registers of Promotions collection
     */
    Promotions
        .aggregate(
            [
                {
                    $match : { "_id": mongoose.Types.ObjectId(req.params._id)}
                },
                {
                    $lookup: {
                        from: 'prices',
                        localField: 'price_id',
                        foreignField: '_id',
                        as: 'price'
                    }
                },
                {"$unwind": "$price"},
                {
                    $project: {
                        _id: true,
                        'price': true,
                        amount: true,
                        regulation: true,
                        date_start: true,
                        date_end: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            ]
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