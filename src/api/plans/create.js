/* eslint-disable id-length */
import Model  from '../../models/mongodb/plans';

export default (req, res) => {

    // Create new plans by req.body data
    Model
        .create(req.body)
        .then(plans => {
            return res.api.send(plans, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}