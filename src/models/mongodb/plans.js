export default {
    collection: 'Plans',
    fields    : {
        installments: [
            {
                _id        : false,
                installment: {
                    type    : Number,
                    required: true,
                    index   : true
                },
                percent    : {
                    type    : Number,
                    required: true,
                    index   : true
                },
                amount     : {
                    type    : Number,
                    required: true,
                    index   : true
                }
            }
        ],
        tags        : [String],
        isActive    : {
            type    : Boolean,
            required: true,
            default : true,
            index   : true
        }
    }
};