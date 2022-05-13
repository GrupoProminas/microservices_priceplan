/* eslint-disable id-length,no-confusing-arrow */
const sortPaymentPlans = (rate) => {

    const sortFn = (a, b) => a.installment === b.installment ? 0 : +(a.installment > b.installment) || -1;

    rate.paymentPlan.boleto = rate.paymentPlan.boleto.sort(sortFn);
    rate.paymentPlan.creditCard = rate.paymentPlan.creditCard.sort(sortFn);
    rate.paymentPlan.debitCard = rate.paymentPlan.debitCard.sort(sortFn);
    rate.paymentPlan.cardRecurrence = rate.paymentPlan.cardRecurrence.sort(sortFn);

    return rate.save();
};

export default {
    collection: 'RateEnrolments',
    fields: {
        _certifierName: {
            type: String,
            required: true
        },
        _typeName: {
            type: String,
            required: true
        },
        paymentPlan: {
            creditCard: [
                {
                    _id: false,
                    installment: {
                        type: Number,
                        required: true
                    },
                    value: {
                        type: Number,
                        required: true
                    }
                }
            ],
            debitCard: [
                {
                    _id: false,
                    installment: {
                        type: Number,
                        required: true
                    },
                    value: {
                        type: Number,
                        required: true
                    }
                }
            ],
            boleto: [
                {
                    _id: false,
                    installment: {
                        type: Number,
                        required: true
                    },
                    value: {
                        type: Number,
                        required: true
                    }
                }
            ],
            cardRecurrence: [
                {
                    _id: false,
                    installment: {
                        type: Number,
                        required: true
                    },
                    value: {
                        type: Number,
                        required: true
                    }
                }
            ]
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    post: {
        findOneAndUpdate: sortPaymentPlans
    }
};