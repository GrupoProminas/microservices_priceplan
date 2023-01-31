
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
        console.log("installmentArray -> ", installmentArray)
        console.log("total -> ", total)
        console.log("charges -> ", JSON.stringify(charges))
        console.log("selectParcels -> ", selectParcels)

        if (parseInt(charges, 10) === 1) {
            console.log('@@@@@@@ oie');

            return installmentArray.paymentPlan.filter(installment => !installment.value || installment.value <= total)
            .filter(installment => parseInt(installment.installment, 10) <= selectParcels)
            .map(installment => ({
                installment: installment.installment,
                value: (total / installment.installment) * (1 + (installment.percent/100))
            }))
        } else {
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
}

export default CreditCardPlansService;
