import mongoose from 'mongoose';

export default mongoose.model(
    'plans',
    mongoose.Schema(
        {
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
        {
            collection: 'plans',
            timestamps: true
        }
    )
);