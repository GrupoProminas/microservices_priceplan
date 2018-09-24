/* eslint-disable id-length */
import {models} from 'mongoose';
const {Tags} = models;

const createTags = (req, res) => {

    // Create new tag by req.body data
    Tags
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createTags;