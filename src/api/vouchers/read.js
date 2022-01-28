/* eslint-disable id-length */

const listVouchers = (req, res) => {

const {Vouchers} = req.models;


    const aggregate = {
        $match: {
            createdAt: {
                $gte: new Date(req.query.dateStart),
                $lt: new Date(req.query.dateEnd)
            }
        }
    };

    if (req.query.cpf !== 'null') {
        aggregate.$match.cpf = req.query.cpf;
    }

    if (req.query.userType !== 'null') {
        aggregate.$match.userType = req.query.userType;
    }

    Vouchers
        .paginate([aggregate], req.query.limit, req.query.page)
        .then(result => {
            if (!result.data.length) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });


};

export default listVouchers;