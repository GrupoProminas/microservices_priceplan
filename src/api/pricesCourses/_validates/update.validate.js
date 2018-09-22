import Joi from 'joi';

export default (req, res, next) => {

    Joi
        .object(
            {
                amount: Joi.number(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}