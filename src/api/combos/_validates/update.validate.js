import Joi from 'joi';

export default (req, res, next) => {
    Joi.object({
        maxCourses: Joi.number().required(),
        certificateCredits: Joi.number().optional().allow([0,null]),
        certifier: Joi.array().items(Joi.string())
        .required(),
        area: Joi.string().allow('*'),
        tags: Joi.array().items(Joi.string()),
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
        ),
        releaseVouchers: Joi.array().items(
            Joi.object({
                tags: Joi.array().items(Joi.string()),
                maximumQuantity: Joi.number(),
                validateType: Joi.string(),
                isFree: Joi.boolean(),
                course: Joi.object({
                    amountType: Joi.string(),
                    amount: Joi.object({
                        pix: Joi.number(),
                        creditCard: Joi.number(),
                        debitCard: Joi.number(),
                        cardRecurrence: Joi.number(),
                        studentCredit: Joi.number(),
                        boleto: Joi.number(),
                        apple: Joi.number()
                    })
                }),
                enrolment: Joi.object({
                    amountType: Joi.string(),
                    amount: Joi.object({
                        pix: Joi.number(),
                        creditCard: Joi.number(),
                        debitCard: Joi.number(),
                        cardRecurrence: Joi.number(),
                        studentCredit: Joi.number(),
                        boleto: Joi.number(),
                        apple: Joi.number()
                    })
                }),
                referenceCertifier: Joi.string(),
                certifier: Joi.array().items(
                    Joi.object({
                        name: Joi.string(),
                        description: Joi.string(),
                        courseType: Joi.array().items(Joi.string())
                    })
                )
            })
        )
    }).validate(req.body, (err) => {
        if (err) {
            return res.status(400).json({
                error: err.details[0].message
            });
        }
        next();
    });
};
