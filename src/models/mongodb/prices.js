import mongoose from 'mongoose';

export default mongoose.model(
    'Prices',
    mongoose.Schema(
        {
            amount: {
                type        : Number,
                required    : true,
                index       : true
            }
        },
        {
            collection: 'Prices',
            timestamps: true
        }
    )
);