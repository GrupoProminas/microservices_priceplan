// Joi Validate
import createValidade from './_validates/create.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create from './create';
import read from './read';
import readOne from './readOne';
import update from './update';

const resources = '/combos';

export default (route) => {

    // Route to create new combo
    route.post(resources, [
        createValidade,
        create
    ]);

    // Route to update existent combo
    route.put(resources + '/:_id', [
        updateValidade,
        update
    ]);

    // Route to read all combo
    route.get(resources, read);

    // Route to read specific combo
    route.get(resources + '/:_id', readOne);
};