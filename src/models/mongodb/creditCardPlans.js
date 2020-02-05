/* eslint-disable id-length,no-confusing-arrow */
const sortPaymentPlans = function(next) {

    const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

    this.paymentPlan = this.paymentPlan.sort(sortFn);

    next();
};


const sortPaymentPlansonUpdate = function(next) {

    if (this._update.$set.paymentPlan && this._update.$set.paymentPlan.length > 0){
        const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

        this._update.$set.paymentPlan = this._update.$set.paymentPlan.sort(sortFn);
    }

    next();
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
        isProduct   : {
            type    : Boolean,
            required: false
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
    pre      : {
        save            : sortPaymentPlans,
        findOneAndUpdate: sortPaymentPlansonUpdate,
        update          : sortPaymentPlansonUpdate
    }
};