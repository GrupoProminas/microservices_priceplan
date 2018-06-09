import mongoose from 'mongoose';

export default mongoose.model(
    'productTypes',
    mongoose.Schema(
        {
            name: {
                type        : String,
                required    : true,
                index       : true
            }
        },
        {
            collection: 'productTypes',
            timestamps: true
        }
    )
);