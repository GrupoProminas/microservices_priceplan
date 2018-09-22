import mongoose from 'mongoose';

export default {
    collection: 'PromotionCourses',
    fields    :    {
        priceCourse_id: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            index: true,
            ref: 'prices._id'
        },
        name: {
          type: String,
          required: true
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
        isActive: {
            type: Boolean,
            default: true,
            allowNull: false
        }
    },
    options   : { // Opcional
        timestamps: true
    }
};