export default {
    collection: 'ProductTypes',
    fields    :   {
        name: {
            type        : String,
            required    : true
        },
        alias: {
          type: String,
          required: true,
          unique: true
        },
        isActive: {
            type        : Boolean,
            required    : true,
            default     : true
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};