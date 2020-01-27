/* eslint-disable id-length,no-confusing-arrow */
const sortPaymentPlans = (plan) => {

    const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

    plan.paymentPlan = plan.paymentPlan.sort(sortFn);

    plan.save();
};

export default {
    collection: 'CreditCardPlans',
    fields    : {
        _certifierName: {
            type    : String,
            required: true
        },
        _typeName     : {
            type    : String,
            required: true
        },
        paymentPlan: [
            {
                _id        : false,
                installment: {
                    type    : Number,
                    required: true
                },
                value      : {
                    type    : Number,
                    required: true
                },
                percent: {
                    type    : Number,
                    default: 0
                }
            }
        ],
        isActive      : {
            type    : Boolean,
            default : true,
            index   : true
        }
    },
    post      : {
        save            : sortPaymentPlans,
        findOneAndUpdate: sortPaymentPlans,
        update          : sortPaymentPlans
    }
};