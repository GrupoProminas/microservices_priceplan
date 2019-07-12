import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                discount: Joi.number(),
                installments: Joi.array().items(Joi.object().keys({
                    installment: Joi.number().required(),
                    percent: Joi.number().required(),
                    amount: Joi.number().required(),
                })).allow('').optional(),
                alias: Joi.string(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}