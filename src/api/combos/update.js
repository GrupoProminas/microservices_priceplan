import mongoose from "mongoose";
import UserValidator from '../../services/VALIDATOR/UserValidator';

const updateCombos = async (req, res) => {

    const {Combos, LogCollections} = req.models;

    const userValidator = new UserValidator();
    const user = userValidator.userValidate(req);

    const beforeCombo = await Combos.findById(req.params._id)

    let logCollections = {
        _collectionName: 'Combos',
        _itemId: req.params._id,
        _userId: mongoose.Types.ObjectId(user._userId.toString()),
        _userName: user._userName,
        beforeUpdate: JSON.parse(JSON.stringify(beforeCombo)),
        afterUpdate: req.body
    }

    await Combos
        .findOneAndUpdate(
            {_id: req.params._id},
            {$set: req.body},
            {new: true}
        )
        .then(async result => {
            if (!result) return res.api.send(null, res.api.codes.NOT_FOUND);

            logCollections.afterUpdate = result;
            await LogCollections.create([logCollections]).then(async l => l).catch(() => null);

            return res.api.send(result, res.api.codes.OK);
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};



export default updateCombos;
