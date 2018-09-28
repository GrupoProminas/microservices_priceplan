/* eslint-disable id-length */
import {models} from 'mongoose';

const {Configurations} = models;

const updateConfigurations = (req, res) => {

    if(req.body.installments !== undefined) {
        for (let i = 0; req.body.installments.length > i; i++) {
            req.body.installments[i].amount *= 100;
        }
    }

    Configurations
        .update(
            {
                _id: req.params._id
            },
            {
                $set: req.body
            }
        )
        .then(update => {
            return res.api.send(update, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default updateConfigurations;