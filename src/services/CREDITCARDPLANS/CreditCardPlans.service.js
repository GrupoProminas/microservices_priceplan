
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

    calcCardPlanforPayment(installmentArray, total, charges = 1, selectParcels = 1) {
        if (parseInt(charges, 10) === 1) {
            return installmentArray.paymentPlan.filter(installment => !installment.value || installment.value <= total)
            .filter(installment => installment.installment <= selectParcels)
            .map(installment => ({
                installment: installment.installment,
                value: (total / installment.installment) * (1 + (installment.percent/100))
            }))
        }

        return installmentArray.paymentPlan.filter(installment =>
            !installment.value || installment.value <= total
        )
        .filter(installment =>!installment.charges || installment.charges <= charges)
        .map(installment => ({
            installment: installment.installment,
            value: (total / installment.installment) * (1 + (installment.percent/100))
        }));
    }
}

export default CreditCardPlansService;
