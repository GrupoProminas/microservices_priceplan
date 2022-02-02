
class CreditCardPlansService {

    constructor(models) {
        this.models = models;
    }

    CheckExistsCerfierPlan(_certifierName, _typeName) {
        return this.models.CreditCardPlans.findOne({_certifierName: _certifierName, _typeName: _typeName}).then(doc => {
            if (doc) return true;

            return false;
        });
    }

    calcCardPlanforPayment(installmentArray, total) {
        return installmentArray.paymentPlan
            .filter(installment => installment.value <= total)
            .map(installment => ({
                installment: installment.installment,
                value: (total / installment.installment) * (1 + (installment.percent/100))
            }))
    }
}

export default CreditCardPlansService;
