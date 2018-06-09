import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                installment: Joi.number().allow('').optional(),
                percent: Joi.number().allow('').optional(),
                amount: Joi.number().allow('').optional(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}