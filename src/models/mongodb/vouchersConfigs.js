export default {
    collection: 'VouchersConfigs',
    fields: {
        isActive: {
            type: Boolean
        },
        maximunWorkload: {
            type: Number,
            required: true
        },
        validationDate: {
            type: Date
        },
        MaximunQuantity: {
            type: Number,
            default: 1,
            required: true
        },
        courseType: {
            type    : String,
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