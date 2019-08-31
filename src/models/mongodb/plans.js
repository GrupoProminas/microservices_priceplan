/* eslint-disable id-length,no-confusing-arrow */
const sortPaymentPlans = (plan) => {

    const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

    plan.boleto = plan.boleto.sort(sortFn);
    plan.creditCard = plan.creditCard.sort(sortFn);
    plan.debitCard = plan.debitCard.sort(sortFn);

    plan.save();
};

export default {
    collection: 'Plans',
    fields    : {
        name      : {
            type    : String,
            required: true
        },
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
        ],
        isActive  : {
            type    : Boolean,
            required: true,
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