import {models} from 'mongoose';

const {Plans} = models;

const createCreditCardPlan = (req, res) => {

    Plans
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createCreditCardPlan;