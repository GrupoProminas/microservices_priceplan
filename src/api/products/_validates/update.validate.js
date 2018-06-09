import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                name: Joi.string().allow('').optional(),
                alias: Joi.string().allow('').optional(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}