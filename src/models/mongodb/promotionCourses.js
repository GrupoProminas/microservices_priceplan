import {SchemaTypes} from 'mongoose';

export default {
    collection: 'PromotionCourses',
    fields    : {
        name      : {
            type    : String,
            required: true
        },
        regulation: {
            type     : String,
            allowNull: false
        },
        tags      : {
            type    : [String],
            required: false,
            default : []
        },
        _coursesId: {
            type    : [SchemaTypes.ObjectId],
            required: false,
            default : []
        },
        dateStart : {
            type     : Date,
            allowNull: false
        },
        dateEnd   : {
            type     : Date,
            allowNull: false
        },
        isActive  : {
            type     : Boolean,
            default  : true,
            allowNull: false
        }
    },
    options   : {
        timestamps: true
    }
};