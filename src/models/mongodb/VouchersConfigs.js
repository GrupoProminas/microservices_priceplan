export default {
    collection: 'VouchersConfigs',
    fields: {
        isActive: {
            type: Boolean,
            default: true
        },
        dateEnd: Date,
        limit: {
            type: Number,
            default: 1,
            required: true
        },
        isFree: {
            type    : Boolean,
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
                _id        : false,
                name: {
                    type    : String,
                    required: true
                },
                description: {
                    type    : String,
                    required: true
                },
                courseType: [
                    {
                        type    : String,
                        required: true
                    }
                ]
            }
        ]
    }
}