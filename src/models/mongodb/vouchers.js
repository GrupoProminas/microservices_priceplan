import {SchemaTypes} from 'mongoose';

export default {
    collection: 'Vouchers',
    fields: {
        code: {
            type: String,
            required: true,
            uppercase: true
        },
        userType: {
            type: String,
            enum: [
                'partner',
                'employer',
                'system',
                'student'
            ],
            required: true
        },
        cpf: String,
        tags: [String],
        _courseId: SchemaTypes.ObjectId,
        validateType: {
            type: String,
            enum: [
                'period',
                'usage'
            ],
            required: true
        },
        usage: Number,
        dateStart: Date,
        dateEnd: Date,
        enrolment: {
            amountType: {
                type: String,
                enum: [
                    'percentage',
                    'value',
                    ''
                ]
            },
            amount: {
                boleto: {
                    type: Number
                },
                creditCard: {
                    type: Number
                },
                debitCard: {
                    type: Number
                },
                cardRecurrence: {
                    type: Number
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
                ]
            },
            amount: {
                boleto: {
                    type: Number
                },
                creditCard: {
                    type: Number
                },
                debitCard: {
                    type: Number
                },
                cardRecurrence: {
                    type: Number
                }
            }
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        metadata: {
            type: SchemaTypes.Mixed
        }
    }
}