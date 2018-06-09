import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                price_id: Joi.string().required(),
                amount: Joi.number().required(),
                regulation: Joi.number().required(),
                date_start: Joi.date().required(),
                date_end: Joi.date().required(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}