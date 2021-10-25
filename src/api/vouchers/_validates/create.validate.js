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
                ])
                    .required(),
                cpf: Joi.string(),
                tags: Joi.array(),
                _courseId: Joi.string().regex(Joi.regexes.objectId),
                validateType: Joi.string().valid([
                    'period',
                    'usage'
                ])
                    .required(),
                usage: Joi.number(),
                dateStart: Joi.string(),
                dateEnd: Joi.string(),
                isActive: Joi.boolean().allow('')
                    .optional(),
                enrolment: Joi.object({
                    amountType: Joi.string().valid([
                        'percentage',
                        'value',
                        ''
                    ])
                        .required(),
                    amount: Joi.object({
                        pix: Joi.number().required(),
                        boleto: Joi.number().required(),
                        creditCard: Joi.number().required(),
                        debitCard: Joi.number().required(),
                        cardRecurrence: Joi.number().required()
                    }).required()
                }).required(),
                course: Joi.object({
                    amountType: Joi.string().valid([
                        'percentage',
                        'value',
                        ''
                    ])
                        .required(),
                    amount: Joi.object({
                        pix: Joi.number().required(),
                        boleto: Joi.number().required(),
                        creditCard: Joi.number().required(),
                        debitCard: Joi.number().required(),
                        cardRecurrence: Joi.number().required()
                    }).required()
                })
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}