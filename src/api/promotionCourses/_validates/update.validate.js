import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                priceCourse_id: Joi.string().allow('').optional(),
                name: Joi.string().allow('').optional(),
                amount: Joi.number().allow('').optional(),
                regulation: Joi.string().allow('').optional(),
                date_start: Joi.date().allow('').optional(),
                date_end: Joi.date().allow('').optional(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}