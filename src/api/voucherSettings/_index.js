import create from './create';
import createValidate from './_validate/create.validate';
import reader from './reader';

const resources = '/vouchersettings';

export default (route) => {
    // Rota para criar novo plano de cartão de crédito
    route.post(resources, [
        createValidate,
        create
    ]);
    route.get(resources, [
        reader
    ]);
}