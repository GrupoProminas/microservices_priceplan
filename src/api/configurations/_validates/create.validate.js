import Joi from 'joi';

export default (req, res, next) => {

const {Configurations} = req.models;

    Joi
        .object(
            {
                name: Joi.string().required(),
                value: Joi.string().required(),
                description: Joi.string(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Configurations
                    .findOne(
                        {"name": req.body.name}
                    )
                    .then(haveItem => {
                        if(haveItem)
                            return res.api.send('name_already_exists', res.api.codes.NOT_ACCEPTABLE);

                        next();
                    })
                    .catch(err => {
                        return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
                    })
            }
        });
}