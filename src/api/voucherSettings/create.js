import {models} from 'mongoose';

const {VouchersConfigs} = models;

const create = (req, res) => {

    VouchersConfigs.create(req.body)
    .then(doc => {
        return res.api.send(doc, res.api.codes.CREATED);
    })
    .catch(err => {
        res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR)
    });
}

export default create;