import Joi from 'joi';

export default (req, res, next) => {
    Joi.object({
        maxCourses: Joi.number().required(),
        certificateCredits: Joi.number().optional().allow([0,null]),
        certifier: Joi.string().required(),
        courseType: Joi.string().required(),
        area: Joi.string().allow('*'),
        tags: Joi.array().items(Joi.string()),
        subcategory: Joi.array().items(Joi.string())
            .allow('*'),
        _exceptions: Joi.array().items(Joi.string()),
        blackListedTags: Joi.array().items(Joi.string()),
        commissionLevel: Joi.string().valid('min', 'med', 'max')
            .required(),
        referenceCommissionType: Joi.string(),
        paymentPlan: Joi.array().items(
            Joi.object({
                courses: Joi.number().required(),
                plan: Joi.object({
                    creditCard: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    debitCard: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    cardRecurrence: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    boleto: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    pix: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    )
                })
            })
        ),
        minPaymentPlan: Joi.array().items(
            Joi.object({
                courses: Joi.number().required(),
                plan: Joi.object({
                    creditCard: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    debitCard: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    cardRecurrence: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    boleto: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    ),
                    pix: Joi.array().items(
                        Joi.object({
                            _id: Joi.boolean().allow(false),
                            installment: Joi.number().required(),
                            value: Joi.number().required()
                        })
                    )
                })
            })
        ),
        isEnabled: Joi.boolean().required(),
        name: Joi.string(),
        quantityCourses: Joi.array().items(
            Joi.object({
                typeCourse: Joi.string().required(),
                quantity: Joi.number().required(),
                subcategory: Joi.string().allow('*')
            })
        )
        }).validate(req.body, err => {
        if (err) {
            return res.status(400).json({
                error: err.details[0].message
            });
        }
        next();
    });
};
