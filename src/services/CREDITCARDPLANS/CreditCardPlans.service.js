import {models} from 'mongoose';

const {CreditCardPlans} = models;

class CreditCardPlansService {
    constructor() {}

    CheckExistsCerfierPlan(_certifierName, _typeName) {
        return CreditCardPlans.findOne({_certifierName: _certifierName, _typeName: _typeName}).then(doc => {
            if (doc) return true;

            return false;
        });
    }

    calcCardPlanforPayment(installmentArray, total) {
        return installmentArray.paymentPlan
            .filter(installment => installment.value <= total/installment.installment)
            .map(installment => ({
                installment: installment.installment,
                value: (total / installment.installment) * (1 + (installment.percent/100))
            }))
    }
}

export default new CreditCardPlansService();