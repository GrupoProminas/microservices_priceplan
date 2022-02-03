import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';


const createCreditCardPlan = async (req, res) => {

    const {CreditCardPlans} = req.models;

    const creditCardPlansService = new CreditCardPlansService(req.models);
    creditCardPlansService.CheckExistsCerfierPlan(req.body._certifierName, req.body._typeName)
    .then(doc => {
        if(!doc) {
            return CreditCardPlans
            .create(req.body)
            .then(plans => {
                return plans;
            })
        }
        else throw new Error('Essa certificadora já possui plano de pagamento para esse tipo de curso')
    })
    .then(doc => {
        return res.api.send(doc, res.api.codes.CREATED);
    })
    .catch(err => {
        return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
    });
}

export default createCreditCardPlan;
