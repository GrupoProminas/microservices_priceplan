import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                _certifierName: Joi.string(),
                _typeName: Joi.string().required(),
                paymentPlan: Joi.object({
                    creditCard: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    })),
                    debitCard: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    })),
                    boleto: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    }))
                }).required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            }

            next();

        });
}