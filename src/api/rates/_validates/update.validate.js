import Joi from 'joi';
import {models} from 'mongoose';
const {Rates} = models;

export default (req, res, next) => {
    Joi
        .object(
            {
                _planId: Joi.string(),
                name: Joi.string(),
                alias: Joi.string(),
                typeRate: Joi.string().valid([
                    'declaration',
                    'enrolment',
                    'others'
                ]),
                amount: Joi.number(),
                metadata: Joi.any(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Rates
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