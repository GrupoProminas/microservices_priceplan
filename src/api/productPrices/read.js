/* eslint-disable id-length */
import Model from '../../models/mongodb/productPrices';

export default (req, res) => {

    /**
     * Find all registers of Model collection
     */
    Model
        .paginate(
            [
                {
                    $match: req.query.where
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
            ],
            req.query.limit,
            req.query.page
        )
        .then(result => {

            // If no have data send a not found response
            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })


}