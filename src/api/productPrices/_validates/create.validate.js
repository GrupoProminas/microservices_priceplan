import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                reference_id: Joi.string().required(),
                alias: Joi.string().required(),
                product_type_id: Joi.string().required(),
                price_id: Joi.string().required(),
                plan_id: Joi.string().required(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}