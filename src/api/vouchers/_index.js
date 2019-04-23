/* eslint-disable array-bracket-newline */
// Joi Validate
import createValidade from './_validates/create.validate';
import createEmployeeValidade from './_validates/createEmployee.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create from './create';
import createEmployee from './createEmployee';
import read from './read';
import readAll from './readAll';
import readAllEmployee from './readAllEmployee';
import readOne from './readOne';
import update from './update';
import updateUsage from './updateUsage';

const resources = '/vouchers';

export default (route) => {

    route.post('/voucher_employee', [
        createEmployeeValidade,
        createEmployee
    ]);

    route.post(resources, [
        createValidade,
        create
    ]);

    route.put(resources + '/:_id', [
        updateValidade,
        update
    ]);

    route.put('/vouchers_usage/:_id', [
        updateUsage
    ]);

    route.get(resources, read);

    route.get('/vouchers_all', readAll);

    route.get('/voucher_employee', readAllEmployee);

    route.get(resources + '/:_id', readOne);
};