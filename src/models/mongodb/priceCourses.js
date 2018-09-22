export default {
    collection: 'PriceCourses',
    fields    :   {
        amount: {
            type        : Number,
            required    : true,
            index       : true
        },
        isActive: {
            type        : Boolean,
            required    : true,
            default     : true,
            index       : true
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};