import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                code: Joi.string(),
                userType: Joi.string().valid([
                    'partner',
                    'employee'
                ]),
                cpf: Joi.string(),
                voucherType: Joi.string().valid([
                    'enrolment',
                    'course',
                    'courseware',
                    'store'
                ]),
                tags: Joi.array(),
                amountType: Joi.string().valid([
                    'percentage',
                    'value'
                ]),
                amount: Joi.number(),
                validateType: Joi.string().valid([
                    'period',
                    'usage'
                ]),
                usage: Joi.number(),
                dateStart: Joi.string(),
                dateEnd: Joi.string(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}