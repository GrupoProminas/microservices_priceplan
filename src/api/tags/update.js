/* eslint-disable id-length */
import {models} from 'mongoose';

const {Tags} = models;

const updateTags = (req, res) => {

    // Create new plans by req.body data
    Tags
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

export default updateTags;