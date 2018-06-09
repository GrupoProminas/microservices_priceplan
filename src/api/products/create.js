/* eslint-disable id-length */
import Model  from '../../models/mongodb/products';

export default (req, res) => {

    // Create new products by req.body data
    Model
        .create(req.body)
        .then(products => {
            return res.api.send(products, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
}