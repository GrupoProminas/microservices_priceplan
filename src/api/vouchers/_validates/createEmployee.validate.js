/* eslint-disable newline-per-chained-call */
import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                code: Joi.string(),
                voucherType: Joi.string().valid([
                    'enrolment',
                    'course'
                ]).required(),
                tags: Joi.array(),
                amountType: Joi.string().valid([
                    'percentage',
                    'value'
                ]).required(),
                amount: Joi.number().required(),
                validateType: Joi.string().valid([
                    'period',
                    'usage'
                ]).required(),
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