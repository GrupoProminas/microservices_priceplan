/* eslint-disable id-length */


const updateUsage = (req, res) => {

const {Vouchers} = req.models;


    Vouchers
        .update(
            {
                _id: req.params._id
            },
            {
                $inc: {usage: -1}
            }
        )
        .then(update => {
            return res.api.send(update, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default updateUsage;