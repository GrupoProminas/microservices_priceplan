/* eslint-disable max-statements */
import { Types } from 'mongoose';
import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';

const getEnrolment = async (req) => {
    const {Enrolments} = req.models;

    const enrolmentId = req.query.enrolmentId ? req.query.enrolmentId.split(',') : '';

    if (!enrolmentId) return false;

    return Enrolments.findOne({_id: {$in: enrolmentId.map(id => Types.ObjectId(id))}}, {registryCourse:1, enrolment: 1, metadata: 1});
}

const readByCertifier = async (req, res) => {
    const {Configurations} = req.models;

    const _getMaxParcelsConfig = async () => {
        const config = await Configurations.findOne({
            name:"config_num_max_parcels",
            isActive:true
        });

        if (!config || !config.value) throw new Error('config-not-found');

        return parseInt(config.value);
    };

    const {CreditCardPlans} = req.models;
    const maxParcels = await _getMaxParcelsConfig();
    // Desabilita a trava de pagamento pelo contrato
    let disableValidatePayment = await Configurations.findOne({name:"disable_valid_payment_by_contract",isActive:true})

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
            let selectParcels = ((installmentArray || {}).paymentPlan || []).find(pp => !!pp.charges && pp.charges >= 1) ? 1 : 18;
            const chargeType  = decodeURIComponent(req.params._type);
            let total         = 0;
            let charges       = 1;

            if (totalArray.length === 1) {
                total = totalArray[0];
            } else if (totalArray.length === 2) {
                charges = parseInt(totalArray[0]);
                total = totalArray[1];
            } else {
                return res.api.send('Parâmetro TOTAL inválido', res.api.codes.BAD_REQUEST);
            }

            if (!(installmentArray && installmentArray.paymentPlan && Array.isArray(installmentArray.paymentPlan) && installmentArray.paymentPlan.length)) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            // RESPEITANDO O CONTRATO
            if (!disableValidatePayment) {
                if (req.enrolment && req.enrolment.metadata && req.enrolment.metadata.prices) {
                    if (chargeType === 'rate-enrolment') {
                        const paymentMethodPredefined = ((req.enrolment.metadata.prices.enrolment || {}).paymentMethod || "").toLowerCase();

                        selectParcels = paymentMethodPredefined === 'creditcard' ?
                            parseInt(req.enrolment.enrolment.installment) :
                            1;
                    } else if (chargeType === 'monthly') {
                        const paymentMethodPredefined = ((req.enrolment.metadata.prices.course || {}).paymentMethod || "").toLowerCase();

                        selectParcels = paymentMethodPredefined === 'creditcard' ?
                            parseInt(req.enrolment.registryCourse.courseAmount.installment) :
                            1;
                    } else if (chargeType === 'rate-enrolment-monthly') {
                        const paymentMethodPredefined = ((req.enrolment.metadata.prices.course || {}).paymentMethod || "").toLowerCase();

                        selectParcels = paymentMethodPredefined === 'creditcard' ?
                            parseInt(req.enrolment.metadata.prices.course.installments) :
                            1;
                    }
                }
            }

            const creditCardPlansService = new CreditCardPlansService(req.models);
            let result;

            if (charges > 1 && [
                'rate-enrolment',
                'monthly',
                'rate-enrolment-monthly',
            ].includes(chargeType)) {
                selectParcels = charges <= maxParcels ? charges : maxParcels;
                charges = 1;
                result = creditCardPlansService.calcCardPlanforPayment(installmentArray, total, charges, selectParcels);
            } else {
                result = creditCardPlansService.calcCardPlanforPayment(installmentArray, total, charges, selectParcels);
            }

            if (!(result && Array.isArray(result) && result.length)) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            console.error(err);

            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default readByCertifier;
