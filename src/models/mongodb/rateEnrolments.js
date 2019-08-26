export default {
    collection: 'RateEnrolments',
    fields: {
        _certifierName: {
            type: String,
            required: true
        },
        _typeName: {
          type: String,
          required: true
        },
        paymentPlan: {
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
            ]
        },
        isActive: {
            type: Boolean,
            required    : true,
            default     : true,
            index       : true
        }
    }
}