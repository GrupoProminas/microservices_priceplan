/* eslint-disable id-length */
import Model from '../../models/mongodb/promotions';

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
                    $project: {
                        _id: true,
                        'price.amount': true,
                        amount: true,
                        regulation: true,
                        date_start: true,
                        date_end: true,
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