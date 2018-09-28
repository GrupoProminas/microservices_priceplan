/* eslint-disable id-length */
import {models} from 'mongoose';
const {Configurations} = models;

const createConfigurations = (req, res) => {

    if(req.body.installments.length > 0) {
        for (let i = 0; req.body.installments.length > i; i++) {
            req.body.installments[i].amount *= 100;
        }
    }

    Configurations
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createConfigurations;