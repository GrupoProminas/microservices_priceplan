/* eslint-disable id-length */
import {models} from 'mongoose';
const {Tags} = models;

const listTags = (req, res) => {

    /**
     * Find all registers of Model collection
     */
    Tags
        .paginate(req.query.aggregate, req.query.limit, req.query.page)
        .then(result => {
            if (!result.data.length) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        })

};

export default listTags;