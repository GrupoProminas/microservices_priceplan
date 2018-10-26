import {models} from 'mongoose';

const {PromotionCourses} = models;

const createPromotion = (req, res) => {

    PromotionCourses
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createPromotion;