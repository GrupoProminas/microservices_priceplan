/* eslint-disable id-length */
import {models} from 'mongoose';
const {PromotionCourses} = models;

const listPromotions = (req, res) => {

    /**
     * Find all registers of Promotions collection
     */
    PromotionCourses
        .paginate(
            [
                {
                    $match: req.query.where
                },
                {
                    $sort: {_id: -1}
                },
                {
                    $lookup: {
                        from: 'PriceCourses',
                        localField: 'priceCourse_id',
                        foreignField: '_id',
                        as: 'priceCourse'
                    }
                },
                {
                    $unwind: '$priceCourse'
                }
            ],
            req.query.limit,
            req.query.page
        )
        .then(result => {

            // If no have data send a not found response
            if (!result.data.length) {
                return res.api.send(null, res.api.codes.OK);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })


};

export default listPromotions;