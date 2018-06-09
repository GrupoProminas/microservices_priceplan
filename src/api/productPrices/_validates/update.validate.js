import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                reference_id: Joi.string().allow('').optional(),
                alias: Joi.string().allow('').optional(),
                product_type_id: Joi.string().allow('').optional(),
                price_id: Joi.string().allow('').optional(),
                plan_id: Joi.string().allow('').optional(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}