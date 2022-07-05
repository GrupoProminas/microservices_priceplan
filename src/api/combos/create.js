

const createCombo = (req, res) => {
    const {Combos} = req.models;

    Combos
        .create(req.body)
        .then(combos => {
            return res.api.send(combos, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createCombo;