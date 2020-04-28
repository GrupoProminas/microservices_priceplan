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
                'system'
            ],
            required: true
        },
        cpf: String,
        tags: [String],
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
        }
    },
    enrolment   : {
        amountType: {
            type    : String,
            enum    : [
                'percentage',
                'value'
            ],
            required: true
        },
        amount    : {
            type    : Number,
            required: true
        }
    },
    course      : {
        amountType: {
            type    : String,
            enum    : [
                'percentage',
                'value'
            ],
            required: true
        },
        amount    : {
            type    : Number,
            required: true
        }
    },
    // Campos antigos mantidos POR ENQUANTO para manter compatibilidade
    voucherType: {
        type: String,
        enum: [
            'enrolment',
            'course',
            'courseware',
            'store'
        ]
    },
    amountType: {
        type: String,
        enum: [
            'percentage',
            'value'
        ]
    },
    amount: {
        type: Number
    },
    options   : {
        timestamps: true
    }
}
