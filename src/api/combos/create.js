import UserValidator from '../../services/VALIDATOR/UserValidator';
import mongoose from "mongoose";

const createCombo = (req, res) => {
    const {Combos, LogCollections} = req.models;

    const userValidator = new UserValidator();
    const user = userValidator.userValidate(req);

    Combos
        .create(req.body)
        .then(async combos => {

            let logCollections = {
                _collectionName: 'Combos',
                _itemId: req.params._id,
                _userId: mongoose.Types.ObjectId(user._userId.toString()),
                _userName: user._userName,
                beforeUpdate: {},
                afterUpdate: combos
            }

            await LogCollections.create([logCollections]).then(async l => l).catch(() => null);

            return res.api.send(combos, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createCombo;