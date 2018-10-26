import {models} from 'mongoose';

const {Configurations} = models;

const listConfigurations = (req, res) => {

    Configurations
        .paginate(req.query.aggregate, req.query.limit, req.query.page)
        .then(result => {
            if (!result.data.length) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default listConfigurations;