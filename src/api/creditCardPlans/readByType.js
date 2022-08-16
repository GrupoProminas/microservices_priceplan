/* eslint-disable max-statements */
import { Types } from 'mongoose';
import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';

const getEnrolment = async (req) => {
    const {Enrolments} = req.models;

    const enrolmentId = req.query.enrolmentId ? req.query.enrolmentId : '';

    if (!enrolmentId) return false;

    return Enrolments.findOne({_id: Types.ObjectId(enrolmentId)});
}

const readByCertifier = async (req, res) => {

    const {CreditCardPlans} = req.models;

    getEnrolment(req)
        .then(enrolment => {
            if (enrolment) req.enrolment = enrolment;

            return CreditCardPlans
            .findOne({
                _certifierName: decodeURIComponent(req.params.certifier),
                _typeName: decodeURIComponent(req.params._typeName),
                isActive: true,
                _type: decodeURIComponent(req.params._type)
            },
            {
                paymentPlan: 1,
                _id: 0
            });
        })
        .then(installmentArray => {
            const totalArray  = req.params.total.split(',');
            let selectParcels = 1;
            const chargeType  = decodeURIComponent(req.params._type);
            let total         = 0;
            let charges       = 1;

            if (totalArray.length === 1) {
                total = totalArray[0];
            } else if (totalArray.length === 2) {
                charges = totalArray[0];
                total = totalArray[1];
            } else {
                return res.api.send('Parâmetro TOTAL inválido', res.api.codes.BAD_REQUEST);
            }

            if (!installmentArray) return res.api.send(null, res.api.codes.NOT_FOUND);

            if (req.enrolment && req.enrolment.metadata && req.enrolment.metadata.prices) {
                if (chargeType === 'rate-enrolment' && req.enrolment.metadata.prices.enrolment) {
                    selectParcels = parseInt(req.enrolment.metadata.prices.enrolment.installments);
                } else if ((chargeType === 'monthly' || chargeType === 'rate-enrolment-monthly') && req.enrolment.metadata.prices.course) {
                    selectParcels = parseInt(req.enrolment.metadata.prices.course.installments);
                }
            }

            const creditCardPlansService = new CreditCardPlansService(req.models);
            const result = creditCardPlansService.calcCardPlanforPayment(installmentArray, total, charges, selectParcels);

            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default readByCertifier;
