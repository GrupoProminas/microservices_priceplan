/* eslint-disable array-element-newline */
import { SchemaTypes } from 'mongoose';

export default {
    collection: 'Combos',
    fields: {
        maxCourses: {
            type: Number,
            required: true
        },
        certificateCredits: {
            type: Number | null,
            required: false,
            default: 0
        },
        certifier: {
            type: [String],
            required: true
        },
        area: {
            type: String,
            required: false,
            default: '*'
        },
        tags: {
            type: [String],
            required: false
        },
        _courses: {
            type: [SchemaTypes.ObjectId],
            required: false,
            default: []
        },
        _exceptions: {
            type: [SchemaTypes.ObjectId],
            required: false,
            default: []
        },
        blackListedTags: {
            type: [String],
            required: false,
            default: []
        },
        commissionLevel: {
            type: String,
            enum: ['min', 'med', 'max'],
            required: true
        },
        referenceCommissionType : {
            type: String,
            required: false
        },
        paymentPlan: [
            {
                courses: {
                    type: Number,
                    required: true
                },
                plan: {
                    creditCard: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    debitCard: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    cardRecurrence: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    boleto: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    pix:[
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ]
                }
            }
        ],
        minPaymentPlan: [
            {
                courses: {
                    type: Number,
                    required: true
                },
                plan: {
                    creditCard: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    debitCard: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    cardRecurrence: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    boleto: [
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ],
                    pix:[
                        {
                            _id: false,
                            installment: {
                                type: Number,
                                required: true
                            },
                            value: {
                                type: Number,
                                required: true
                            }
                        }
                    ]
                }
            }
        ],
        isEnabled: {
            type: Boolean,
            required: false,
            default: false
        },
        name: {
            type: String,
            required: false
        },
        quantityCourses: [
            {
                typeCourse: {
                    type: String
                },
                quantity: {
                    type: Number
                },
                subcategory: {
                    type: String
                }
            }
        ],
        referenceCommissionType: {
            type: String,
            required: false
        },
        releaseVouchers: [
            {
                tags: [String],
                maximunQuantity: Number,
                validateType: String,
                isFree: Boolean,
                referenceCertifier: String,
                course: {
                    amountType: {
                        type: String,
                        enum: [
                            'percentage',
                            'value',
                            ''
                        ],
                        required: true
                    },
                    amount: {
                        boleto: {
                            type: Number,
                            required: true
                        },
                        creditCard: {
                            type: Number,
                            required: true
                        },
                        debitCard: {
                            type: Number,
                            required: true
                        },
                        cardRecurrence: {
                            type: Number,
                            required: true
                        }
                    }
                },
                enrolment: {
                    amountType: {
                        type: String,
                        enum: [
                            'percentage',
                            'value',
                            ''
                        ],
                        required: true
                    },
                    amount: {
                        boleto: {
                            type: Number,
                            required: true
                        },
                        creditCard: {
                            type: Number,
                            required: true
                        },
                        debitCard: {
                            type: Number,
                            required: true
                        },
                        cardRecurrence: {
                            type: Number,
                            required: true
                        }
                    }
                },
                certifier: [
                    {
                        _id: false,
                        name: {
                            type: String,
                            required: true
                        },
                        description: {
                            type: String,
                            required: true
                        },
                        courseType: [
                            {
                                type: String,
                                required: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
};