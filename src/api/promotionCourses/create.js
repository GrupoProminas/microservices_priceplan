/* eslint-disable id-length */
import {models} from 'mongoose';
const {PromotionCourses} = models;

const createPromotions = (req, res) => {

    // Create new promotions by req.body data
    PromotionCourses
        .create(req.body)
        .then(promotions => {
            return res.api.send(promotions, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createPromotions;