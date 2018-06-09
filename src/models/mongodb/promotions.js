import mongoose from 'mongoose';

export default mongoose.model(
    'promotions',
    mongoose.Schema(
        {
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
                type: Number,
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
        {
            collection: 'promotions',
            timestamps: true
        }
    )
);