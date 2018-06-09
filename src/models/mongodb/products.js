import mongoose from 'mongoose';

export default mongoose.model(
    'products',
    mongoose.Schema(
        {
            name: {
                type        : String,
                required    : true,
                index       : true
            },
            alias: {
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
        {
            collection: 'produtcs',
            timestamps: true
        }
    )
);