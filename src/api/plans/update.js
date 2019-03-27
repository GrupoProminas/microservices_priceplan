import {models} from 'mongoose';

const {Plans} = models;

const updatePlan = (req, res) => {

    if (req.body.installments) {

        if (req.body.installments.length > 0) {
            req.body.installments = req.body.installments.map(planInstallment => {
                return {
                    installment: planInstallment.installment,
                    percent: planInstallment.percent,
                    amount: planInstallment.percent * 100
                };
            });
        }
    }

    Plans
        .findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {new: true}
        )
        .then(updated => {
            if (!updated) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(updated, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default updatePlan;