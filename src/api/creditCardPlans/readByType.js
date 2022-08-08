import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';


const readByCertifier = (req, res) => {

const {CreditCardPlans} = req.models;


    CreditCardPlans
        .findOne({
            _certifierName: decodeURIComponent(req.params.certifier),
            _typeName: decodeURIComponent(req.params._typeName),
            isActive: true,
            _type: decodeURIComponent(req.params._type)
        },
        {
            paymentPlan: 1,
            _id: 0
        })
        .then(installmentArray => {

            const totalArray = req.params.total.split(',');
            let total = 0;
            let charges = 1;
            if (totalArray.length === 1) {
                total = totalArray[0];
            } else if (totalArray.length === 2) {
                charges = totalArray[0];
                total = totalArray[1];
            }

            if (!installmentArray) return res.api.send(null, res.api.codes.NOT_FOUND);

            const creditCardPlansService = new CreditCardPlansService(req.models);
            const result = creditCardPlansService.calcCardPlanforPayment(installmentArray, total, charges);


            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default readByCertifier;
