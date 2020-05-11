export default {
    collection: 'VouchersConfigs',
    fields: {
        isActive: {
            type: Boolean,
            default: true
        },
        maximunWorkload: {
            type: Number,
            required: true
        },
        validationDate: {
            type: Date
        },
        maximunQuantity: {
            type: Number,
            default: 1,
            required: true
        },
        courseType: [
            {
                type    : String,
                required: true
            }
        ],
        isFree: {
            type    : Boolean,
            required: true
        },
        certifier: [
            {
                _id        : false,
                name: {
                    type    : String,
                    required: true
                },
                description: {
                    type    : String,
                    required: true
                }
            }
        ]
    }
}