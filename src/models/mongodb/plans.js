
export default {
    collection: 'Plans',
    fields    :   {
        installments: [{
            installment: {
                type: Number,
                required: true,
                index: true
            },
            percent: {
                type: Number,
                required: true,
                index: true
            },
            amount: {
                type: Number,
                required: true,
                index: true
            },
        }],
        active: {
            type: Boolean,
            required: true,
            default: true,
            index: true
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};
