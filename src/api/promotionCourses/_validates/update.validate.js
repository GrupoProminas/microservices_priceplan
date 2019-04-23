import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                name: Joi.string(),
                discountPercentage: Joi.number(),
                regulation: Joi.string(),
                tags: Joi.array().items(Joi.string()),
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