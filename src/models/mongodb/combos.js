/* eslint-disable array-element-newline */
import {SchemaTypes} from 'mongoose';

export default {
    collection: 'Combos',
    fields: {
        maxCourses: {
            type: Number,
            required: true
        },
        certifier: {
            type: String,
            required: true
        },
        courseType: {
            type: String,
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
        subcategory: {
            type: [String],
            required: false,
            default: '*'
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
        ]
    }
};