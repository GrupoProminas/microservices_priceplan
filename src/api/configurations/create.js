import {models} from 'mongoose';

const {Configurations} = models;

const createConfiguration = (req, res) => {

    Configurations
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createConfiguration;