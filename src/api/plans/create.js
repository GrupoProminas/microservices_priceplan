import {models} from 'mongoose';

const {Plans} = models;

const createPlan = (req, res) => {

    if (req.body.installments.length > 0) {
        req.body.installments = req.body.installments.map(planInstallment => {
            return {
                installment: planInstallment.installment,
                percent    : planInstallment.percent,
                amount     : planInstallment.percent * 100
            };
        });
    }

    Plans
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createPlan;