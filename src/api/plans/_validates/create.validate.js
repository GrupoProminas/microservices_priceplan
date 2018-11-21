import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                installments: Joi.array().items(Joi.object().keys({
                    installment: Joi.number().required(),
                    percent: Joi.number().required(),
                    amount: Joi.number().required(),
                })),
                tags: Joi.array().required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}