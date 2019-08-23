import Joi from 'joi';

const objectIdRegex = /^[a-f\d]{24}$/i;

export default (req, res, next) => {

    Joi
        .object(
            {
                name: Joi.string(),
                regulation: Joi.string(),
                tags: Joi.array().items(Joi.string()),
                _coursesId: Joi.array().items(Joi.string().regex(objectIdRegex)),
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
                    }))
                }),
                dateStart: Joi.date(),
                dateEnd: Joi.date(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}