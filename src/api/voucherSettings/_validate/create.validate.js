import Joi from 'joi';

export default (req, res, next) => {
    Joi
        .object(
            {
                maximunWorkload: Joi.number().required(),
                validationDate: Joi.string().required(),
                certifier: Joi.array().items(Joi.object({
                    name: Joi.string().required(),
                    description: Joi.string().required()
                })),
                MaximunQuantity: Joi.number().required(),
                courseType: Joi.string().required(),
                isActive: Joi.boolean()
            }
        )
        .validate(req.body, err => {
            if (err)
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);

            next();
        });
}