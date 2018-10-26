export default {
    collection: 'PriceCourses',
    fields    :   {
        amount: {
            type        : Number,
            required    : true,
            index       : true
        },
        tags: [String],
        isActive: {
            type        : Boolean,
            required    : true,
            default     : true,
            index       : true
        }
    },
    options   : {
        timestamps: true
    }
};