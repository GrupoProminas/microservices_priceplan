/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                _certifierName: Joi.string(),
                _typeName: Joi.string(),
                paymentPlan: Joi.object({
                    creditCard: Joi.array().items(Joi.object().keys({
                        installment: Joi.number(),
                        value: Joi.number()
                    })),
                    debitCard: Joi.array().items(Joi.object().keys({
                        installment: Joi.number(),
                        value: Joi.number()
                    })),
                    boleto: Joi.array().items(Joi.object().keys({
                        installment: Joi.number(),
                        value: Joi.number()
                    })),
                    cardRecurrence: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    }))
                }),
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