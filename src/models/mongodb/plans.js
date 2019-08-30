export default {
    collection: 'Plans',
    fields    :   {
        name: {
            type: String,
            required: true
        },
        creditCard: [
            {
                _id        : false,
                installment: {
                    type    : Number,
                    required: true
                },
                value      : {
                    type    : Number,
                    required: true
                }
            }
        ],
        debitCard : [
            {
                _id        : false,
                installment: {
                    type    : Number,
                    required: true
                },
                value      : {
                    type    : Number,
                    required: true
                }
            }
        ],
        boleto    : [
            {
                _id        : false,
                installment: {
                    type    : Number,
                    required: true
                },
                value      : {
                    type    : Number,
                    required: true
                }
            }
        ],
        isActive: {
            type: Boolean,
            required: true,
            default: true,
            index: true
        }
    },
    options   : {
        timestamps: true
    }
}