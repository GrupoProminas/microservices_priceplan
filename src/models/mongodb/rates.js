import mongoose from 'mongoose';

export default {
    collection: 'Rates',
    fields: {
        _planId: {
            type: mongoose.SchemaTypes.ObjectId,
            default: null
        },
        name: {
            type: String,
            required: true
        },
        alias: {
            type: String,
            required: true,
            unique: true
        },
        typeRate: {
            type: String,
            enum: [
                'declaration',
                'enrolment',
                'others'
            ]
        },
        amount: {
          type: Number,
          required: true
        },
        metadata: {
            type: mongoose.SchemaTypes.Mixed
        },
        isActive: {
            type: Boolean,
            required    : true,
            default     : true,
            index       : true
        }
    }
}