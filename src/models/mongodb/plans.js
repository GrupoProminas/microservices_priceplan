export default {
    collection: 'Plans',
    fields    :   {
        installments: [
            {
                _id        : false,
                installment: {
                    type: Number,
                    required: true,
                    index: true
                },
                percent: {
                    type: Number,
                    required: true,
                    index: true
                },
                amount: {
                    type: Number,
                    required: true,
                    index: true
                }
            }
        ],
        alias: {
            type: String,
            required: true
        },
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