import mongoose from 'mongoose';

export default {
    collection: 'ProductPrices',
    fields    :   {
        reference_id: {
            type: String,
            allowNull: false
        },
        alias: {
            type: String,
            unique: true,
            allowNull: false
        },
        product_type_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true,
            ref: 'productTypes._id'
        },
        price_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true,
            ref: 'prices._id'
        },
        plan_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true,
            ref: 'plans._id'
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