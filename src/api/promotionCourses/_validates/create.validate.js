/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                name: Joi.string().required(),
                discountPercentage: Joi.number().required(),
                regulation: Joi.string().required(),
                tags: Joi.array().items(Joi.string()).required(),
                dateStart: Joi.date().required(),
                dateEnd: Joi.date().required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}