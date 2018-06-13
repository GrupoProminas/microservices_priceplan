export default {
    collection: 'ProductTypes',
    fields    :   {
        name: {
            type        : String,
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