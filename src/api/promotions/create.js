/* eslint-disable id-length */
import Model  from '../../models/mongodb/promotions';

export default (req, res) => {

    // Create new promotions by req.body data
    Model
        .create(req.body)
        .then(promotions => {
            return res.api.send(promotions, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}