/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

const objectIdRegex = /^[a-f\d]{24}$/i;

export default (req, res, next) => {
    Joi
        .object(
            {
                name: Joi.string().required(),
                regulation: Joi.string().required(),
                tags: Joi.array().items(Joi.any()),
                _coursesId: Joi.array().items(Joi.string().regex(objectIdRegex)),
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
                    })),
                    cardRecurrence: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    })),
                    pix: Joi.array().items(Joi.object().keys({
                        installment: Joi.number().required(),
                        value: Joi.number().required()
                    }))
                }).required(),
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