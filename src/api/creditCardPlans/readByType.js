import { Types } from 'mongoose';
import CreditCardPlansService from '../../services/CREDITCARDPLANS/CreditCardPlans.service';

export default async (req, res) => {

    const {Configurations, Enrolments, Charges, CreditCardPlans} = req.models;

    const _extractTotalAmountAndTotalCharges = (inputData) => {
        const splited = inputData.split(',');

        if (splited.length === 1) {
            return {
                totalAmount: splited[0],
                totalCharges: 1,
            };
        }

        if (splited.length === 2) {
            return {
                totalAmount: splited[1],
                totalCharges: splited[0],
            };
        }

        throw new Error('Parâmetro TOTAL inválido');
    };

    const _calcPlan = (totalAmount, maxParcels) => {
        const installments = Array
            .from({ length: maxParcels }, (_, i) => i + 1)
            .filter(item => item !== 1);

        return installments
            .map(installment => ({
                installment: installment,
                value: totalAmount / installment,
            }));
    };

    const _getMaxParcelsConfig = async () => {
        const config = await Configurations.findOne({
            name:"config_num_max_parcels",
            isActive:true
        });

        if (!config || !config.value) throw new Error('config-not-found');

        return parseInt(config.value);
    };

    const _getEnrolment = (enrolmentId) => {
        const enrolment = Enrolments.findOne({
            _id: {
                $in: enrolmentId.map(id => Types.ObjectId(id))
            }
        });

        if (!enrolment) throw new Error('enrolment-not-found');

        return enrolment;
    };

    const _getContractMaxParcels = (chargeType, enrolment) => {
        if (!enrolment.metadata || !enrolment.metadata.prices) return 1;

        if (chargeType === 'rate-enrolment') {
            const paymentMethodPredefined = ((enrolment.metadata.prices.enrolment || {}).paymentMethod || "").toLowerCase();

            return paymentMethodPredefined === 'creditcard' ?
                parseInt(enrolment.enrolment.installment) :
                1;
        }

        if (chargeType === 'monthly') {
            const paymentMethodPredefined = ((enrolment.metadata.prices.course || {}).paymentMethod || "").toLowerCase();

            return paymentMethodPredefined === 'creditcard' ?
                parseInt(enrolment.registryCourse.courseAmount.installment) :
                1;
        }

        if (chargeType === 'rate-enrolment-monthly') {
            const paymentMethodPredefined = ((enrolment.metadata.prices.course || {}).paymentMethod || "").toLowerCase();

            return paymentMethodPredefined === 'creditcard' ?
                parseInt(enrolment.metadata.prices.course.installments) :
                1;
        }

        return 1;
    };

    try {

        const maxParcelsConfig = await _getMaxParcelsConfig();
        const chargeType  = decodeURIComponent(req.params._type);
        const enrolmentId = req.query.enrolmentId ? req.query.enrolmentId.split(',') : '';
        const {totalAmount, totalCharges} = _extractTotalAmountAndTotalCharges(req.params.total);

        const typeAcademic = ['rate-enrolment', 'monthly', 'rate-enrolment-monthly',].includes(chargeType);

        if (totalCharges < 1) {
            throw new Error('not-found');
        }

        if (totalCharges > 1 && !typeAcademic) {
            const maxParcels = totalCharges <= maxParcelsConfig ? totalCharges : maxParcelsConfig;
            const plan = _calcPlan(totalAmount, maxParcels);

            return res.api.send(plan, res.api.codes.OK);
        } else if (!typeAcademic) {

            const installmentArray = await CreditCardPlans
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

            const creditCardPlansService = new CreditCardPlansService(req.models);
            const result = creditCardPlansService.calcCardPlanforPayment(installmentArray, totalAmount, totalCharges, 12);

            return res.api.send(result, res.api.codes.OK);
        }

        const chargeId  = req.query.chargeid;
        const enrolment = await _getEnrolment(enrolmentId);
        const contratMaxParcels = _getContractMaxParcels(chargeType, enrolment);
        const objCharge = chargeId ? await Charges.findById(chargeId) : undefined;
        //Se houver quantidade de parcelas na charge, vai usar esse como referencia
        const maxParcCharges = (objCharge && ((objCharge.metadata || {}).maxInstallmentsOnCreditCard || null)) ? (objCharge.metadata || {}).maxInstallmentsOnCreditCard : null;

        if (contratMaxParcels === 1 && !maxParcCharges) throw new Error('not-found');

        const maxParcels = (maxParcCharges || (contratMaxParcels <= maxParcelsConfig ? contratMaxParcels : maxParcelsConfig));
        const plan = _calcPlan(totalAmount, maxParcels);

        return res.api.send(plan, res.api.codes.OK);

    } catch(err) {
        console.error(err);

        if (err.toString().includes('not-found'))
            return res.api.send(null, res.api.codes.NOT_FOUND);

        return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
    }
};
