import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                _certifierName: Joi.string(),
                _typeName: Joi.string(),
                paymentPlan: Joi.array.items(Joi.object.keys({
                    installment: Joi.number(),
                    value: Joi.number(),
                    percent: Joi.number()
                })),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}