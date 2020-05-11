import mongoose from 'mongoose';

export default {
    collection: 'Vouchers',
    fields: {
        code: {
            type: String,
            required: true
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
        voucherType: {
            type: String,
            enum: [
                'enrolment',
                'course',
                'courseware',
                'store'
            ],
            required: true
        },
        tags: [String],
        amountType: {
            type: String,
            enum: [
                'percentage',
                'value'
            ],
            required: true
        },
        amount: {
            type: Number,
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
        usage: Number,
        dateStart: Date,
        dateEnd: Date,
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        metadata: {
            type: mongoose.SchemaTypes.Mixed
        }
    },
    options   : {
        timestamps: true
    }
}