import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                _certifierName: Joi.string().required(),
                _typeName: Joi.string().required(),
                paymentPlan: Joi.array().items(Joi.object({
                    installment: Joi.number().required(),
                    value: Joi.number().required(),
                    percent: Joi.number().required()
                })).required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}