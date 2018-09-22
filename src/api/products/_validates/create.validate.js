import Joi from 'joi';
import {models} from 'mongoose';
const {Products} = models;


export default (req, res, next) => {
    Joi
        .object(
            {
                _productTypeAlias: Joi.string().required(),
                name: Joi.string().required(),
                alias: Joi.string().required(),
                amount: Joi.number().required(),
                metadata: Joi.any(),
                shipping: Joi.object({
                    packing: Joi.string(),
                    _codePacking: Joi.string(),
                    description: Joi.string(),
                    notes: Joi.string(),
                    weight: Joi.number(),
                    cubage: Joi.number(),
                    dimension: Joi.object({
                        width: Joi.number(),
                        length: Joi.number(),
                        height: Joi.number(),
                        diameter: Joi.number()
                    }),
                    additionalService: {
                        ownHand: Joi.number(),
                        receiptNotice: Joi.number(),
                        declaredValue: Joi.number()
                    }
                }),
                isActive: Joi.boolean().allow('').optional()
            }
        )
        .validate(req.body, err => {
            if (err) {
                return res.api.send(err.message, res.api.codes.UNPROCESSABLE_ENTITY);
            } else {
                Products
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