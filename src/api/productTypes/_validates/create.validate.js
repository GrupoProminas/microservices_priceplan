import Joi from 'joi';

export default (req, res, next) => {

const {ProductTypes} = req.models;

    Joi
        .object(
            {
                name: Joi.string().required(),
                alias: Joi.string().required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                ProductTypes
                    .findOne(
                        {"alias": req.body.alias}
                    )
                    .then(haveItem => {
                        if(haveItem)
                            return res.api.send('alias_already_exists', res.api.codes.NOT_ACCEPTABLE);

                        next();
                    })
                    .catch(err => {
                        return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
                    })
            }
        });
}