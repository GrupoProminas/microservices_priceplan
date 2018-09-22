import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                priceCourse_id: Joi.string().required(),
                name: Joi.string().required(),
                amount: Joi.number().required(),
                regulation: Joi.string().required(),
                date_start: Joi.date().required(),
                date_end: Joi.date().required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}