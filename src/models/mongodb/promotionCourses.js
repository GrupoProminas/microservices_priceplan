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
        paymentPlan         : {
            creditCard: [
                {
                    _id        : false,
                    installment: {
                        type    : Number,
                        required: true
                    },
                    value      : {
                        type    : Number,
                        required: true
                    }
                }
            ],
            debitCard : [
                {
                    _id        : false,
                    installment: {
                        type    : Number,
                        required: true
                    },
                    value      : {
                        type    : Number,
                        required: true
                    }
                }
            ],
            boleto    : [
                {
                    _id        : false,
                    installment: {
                        type    : Number,
                        required: true
                    },
                    value      : {
                        type    : Number,
                        required: true
                    }
                }
            ]
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