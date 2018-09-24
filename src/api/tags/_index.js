// Joi Validate
import createValidade from './_validates/create.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create from './create';
import read from './read';
import update from './update';

let resources = '/tags';

export default (route) => {

    // Route to create new music
    route.post(resources, [
        createValidade,
        create
    ]);

    // Route to update existent music
    route.put(resources + '/:_id', [
        updateValidade,
        update
    ]);

    // Route to read all music
    route.get(resources, read);
    
};