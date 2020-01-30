import {models} from 'mongoose';

const {CreditCardPlans} = models;

const readByCertifier = (req, res) => {

    CreditCardPlans
        .findOne({
            _certifierName: decodeURIComponent(req.params.certifier),
            _typeName: decodeURIComponent(req.params._typeName),
            value: req.params.value,
            isActive: true
        },
        {
            paymentPlan: 1,
            _id: 0
        })
        .then(installmentArray => {

            let result = installmentArray.paymentPlan.filter(installment => installment.value <= req.params.total);

            result = result.map(installment => {
                return {
                    installment: installment.installment,
                    value: (req.params.total / installment.installment) * (1 + (installment.percent/100))
                }
            })

            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default readByCertifier;