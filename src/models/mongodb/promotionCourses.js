/* eslint-disable id-length,no-confusing-arrow */
import {SchemaTypes} from 'mongoose';

const sortPaymentPlans = (promotion) => {

    const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

    promotion.paymentPlan.boleto = promotion.paymentPlan.boleto.sort(sortFn);
    promotion.paymentPlan.creditCard = promotion.paymentPlan.creditCard.sort(sortFn);
    promotion.paymentPlan.debitCard = promotion.paymentPlan.debitCard.sort(sortFn);

    promotion.save();
};

export default {
    collection: 'PromotionCourses',
    fields    : {
        name       : {
            type    : String,
            required: true
        },
        regulation : {
            type     : String,
            allowNull: false
        },
        tags       : {
            type    : [String],
            required: false,
            default : []
        },
        _coursesId : {
            type    : [SchemaTypes.ObjectId],
            required: false,
            default : []
        },
        paymentPlan: {
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
        dateStart  : {
            type     : Date,
            allowNull: false
        },
        dateEnd    : {
            type     : Date,
            allowNull: false
        },
        isActive   : {
            type     : Boolean,
            default  : true,
            allowNull: false
        }
    },
    post      : {
        save            : sortPaymentPlans,
        findOneAndUpdate: sortPaymentPlans,
        update          : sortPaymentPlans
    }
};