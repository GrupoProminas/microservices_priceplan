import { SchemaTypes } from "mongoose";

export default {
    collection: 'VouchersConfigs',
    fields: {
        isActive: {
            type: Boolean,
            default: true
        },
        dateEnd: Date,
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
        limit: {
            type: Number,
            default: 1,
            required: true
        },
        isFree: {
            type: Boolean,
            required: true
        },
        validateType: {
            type: String,
            enum: [
                'period',
                'usage'
            ],
            required: true
        },
        tags: [String],
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
        ],
        useConfigByCombo: {
            type: Boolean,
            default: false,
            required: false
        },
        releaseCourse: {
            courseName: String,
            _courseId: SchemaTypes.ObjectId,
            certifier: String,
            acronim: String,
            code: String
        }
    }
}