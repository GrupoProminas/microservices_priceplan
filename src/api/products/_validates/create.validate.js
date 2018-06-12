import Joi from 'joi';
import mongoose from 'mongoose';
import Model from '../../../models/mongodb/products';

export default (req, res, next) => {
    Joi
        .object(
            {
                name: Joi.string().required(),
                alias: Joi.string().required(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Model
                    .findOne(
                        {"alias": req.body.alias}
                    )
                    .then(haveItem => {
                        if(haveItem)
                            return res.api.send('alias_already_exists', res.api.codes.NOT_ACCEPTABLE);

                        next();
                    })
                    .catch(err => {
                        return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
                    })
            }
        });
}