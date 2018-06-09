/* eslint-disable id-length */
import Model  from '../../models/mongodb/products';

export default (req, res) => {

    // Create new products by req.body data
    Model
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
}