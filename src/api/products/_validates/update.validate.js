import Joi from 'joi';
import {models} from 'mongoose';
const {Products} = models;

export default (req, res, next) => {

    Joi
        .object(
            {
                name: Joi.string().allow('').optional(),
                alias: Joi.string().allow('').optional(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Products
                    .findOne(
                        {"alias": req.body.alias}
                    )
                    .then(haveItem => {
                        if (haveItem) {
                            if (haveItem._id.toString() === req.params._id) {
                                return next();
                            } else {
                                return res.api.send('alias_already_exists', res.api.codes.NOT_ACCEPTABLE);
                            }
                        }

                        next();
                    })
            }
        });
}