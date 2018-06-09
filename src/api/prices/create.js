/* eslint-disable id-length */
import Model  from '../../models/mongodb/prices';

export default (req, res) => {

    // Create new prices by req.body data
    Model
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}