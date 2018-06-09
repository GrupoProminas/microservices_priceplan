/* eslint-disable id-length */
import Model  from '../../models/mongodb/productPrices';

export default (req, res) => {

    // Create new productPrices by req.body data
    Model
        .create(req.body)
        .then(productPrices => {
            return res.api.send(productPrices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}