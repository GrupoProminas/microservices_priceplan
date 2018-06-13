export default {
    collection: 'Products',
    fields    :   {
        name: {
            type        : String,
            required    : true,
            index       : true
        },
        alias: {
            type        : String,
            unique      : true,
            required    : true
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