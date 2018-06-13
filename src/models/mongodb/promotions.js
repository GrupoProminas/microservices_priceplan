import mongoose from 'mongoose';

export default {
    collection: 'Promotions',
    fields    :    {
        price_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true,
            ref: 'prices._id'
        },
        amount: {
            type: Number,
            allowNull: false
        },
        regulation: {
            type: String,
            allowNull: false
        },
        date_start: {
            type: Date,
            allowNull: false
        },
        date_end: {
            type: Date,
            allowNull: false
        },
        active: {
            type: Boolean,
            default: true,
            allowNull: false
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};