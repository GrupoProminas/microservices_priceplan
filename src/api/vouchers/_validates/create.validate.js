import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                code: Joi.string(),
                userType: Joi.string().valid([
                    'partner',
                    'employer',
                    'system',
                    'student'
                ]).required(),
                cpf: Joi.string(),
                tags: Joi.array(),
                validateType: Joi.string().valid([
                    'period',
                    'usage'
                ]).required(),
                usage: Joi.number(),
                dateStart: Joi.string(),
                dateEnd: Joi.string(),
                isActive: Joi.boolean().allow('').optional(),
                enrolment: Joi.object({
                    amountType: Joi.string().valid([
                        'percentage',
                        'value'
                    ]).required(),
                    amount: Joi.number().required()
                }),
                course: Joi.object({
                    amountType: Joi.string().valid([
                        'percentage',
                        'value'
                    ]).required(),
                    amount: Joi.number().required()
                }),
                // Campos antigos mantidos POR ENQUANTO para manter compatibilidade
                voucherType: Joi.string().valid([
                    'enrolment',
                    'course',
                    'courseware',
                    'store'
                ]),
                amountType: Joi.string().valid([
                    'percentage',
                    'value'
                ]),
                amount: Joi.number()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}
