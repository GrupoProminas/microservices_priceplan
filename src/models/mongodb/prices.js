import mongoose from 'mongoose';

export default mongoose.model(
    'prices',
    mongoose.Schema(
        {
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
        {
            collection: 'prices',
            timestamps: true
        }
    )
);