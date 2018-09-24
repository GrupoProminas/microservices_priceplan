import Joi from 'joi';
import {models} from 'mongoose';
const {Tags} = models;

export default (req, res, next) => {
    Joi
        .object(
            {
                name: Joi.string().required(),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Tags
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