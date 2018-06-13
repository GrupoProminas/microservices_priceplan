export default {
    collection: 'Prices',
    fields    :   {
        amount: {
            type        : Number,
            required    : true,
            index       : true
        },
        active: {
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