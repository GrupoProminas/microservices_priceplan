import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                name: Joi.string().required(),
                alias: Joi.string().required(),
                active: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}