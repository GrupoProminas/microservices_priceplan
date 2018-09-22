import mongoose from 'mongoose';

export default {
    collection: 'Rates',
    fields: {
        _planId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true
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