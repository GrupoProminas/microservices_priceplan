import {models} from 'mongoose';
import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';

const {CreditCardPlans} = models;

const readByCertifier = (req, res) => {

    CreditCardPlans
        .findOne({
            _certifierName: decodeURIComponent(req.params.certifier),
            _typeName: decodeURIComponent(req.params._typeName),
            isActive: true,
            $or:[
                    {isProduct:false},
                    {isProduct:{$exists:false}}
                ]
        },
        {
            paymentPlan: 1,
            _id: 0
        })
        .then(installmentArray => {

            if (!installmentArray) return res.api.send(null, res.api.codes.NOT_FOUND);

            const result = CreditCardPlansService.calcCardPlanforPayment(installmentArray, req.params.total);


            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default readByCertifier;