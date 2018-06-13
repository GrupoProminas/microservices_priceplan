/* eslint-disable id-length,new-cap */
import {models} from 'mongoose';
const {ProductPrices} = models;

import mongoose from 'mongoose';

const getProductPrices = (req, res) => {

    /**
     * Find all registers of ProductPrices collection
     */
    ProductPrices
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
                    $lookup: {
                        from: 'plans',
                        localField: 'plan_id',
                        foreignField: '_id',
                        as: 'plan'
                    }
                },
                {"$unwind": "$plan"},
                {
                    $lookup: {
                        from: 'productTypes',
                        localField: 'product_type_id',
                        foreignField: '_id',
                        as: 'productType'
                    }
                },
                {"$unwind": "$productType"},
                {
                    $project: {
                        _id: true,
                        reference_id: true,
                        alias: true,
                        'price': true,
                        'plan': true,
                        'productType': true,
                        active: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            ]
        )
        .then(artist => {

            // If no have data send a not found response
            if (!artist) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(artist, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default getProductPrices;