import Joi from 'joi';


export default (req, res, next) => {

const {Products} = req.models;

    Joi
        .object(
            {
                _productTypeAlias: Joi.string(),
                name: Joi.string(),
                alias: Joi.string(),
                amount: Joi.number(),
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
                        longitude: Joi.number(),
                        height: Joi.number(),
                        diameter: Joi.number()
                    }),
                    additionalService: {
                        ownHand: Joi.boolean(),
                        receiptNotice: Joi.boolean(),
                        declaredValue: Joi.boolean()
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