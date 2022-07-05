

const updateCombos = (req, res) => {

const {Combos} = req.models;

    Combos
        .findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {new: true}
        )
        .then(result => {
            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default updateCombos;