/* eslint-disable id-length */
import Prices from '../../models/mongodb/prices';

export default (req, res) => {

    /**
     * Find all registers of Prices collection
     */
    Prices
        .paginate(
            [
                {
                    $match: req.query.where
                }
            ],
            req.query.limit,
            req.query.page
        )
        .then(result => {

            // If no have data send a not found response
            if (!result.data.length) {
                return res.api.send(null, res.api.codes.NOT_FOUND);
            }

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })


}