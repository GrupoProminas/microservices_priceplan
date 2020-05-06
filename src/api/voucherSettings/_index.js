import create from './create';
import createValidate from './_validate/create.validate';

const resources = '/vouchersettings';

export default (route) => {
    // Rota para criar novo plano de cartão de crédito
    route.post(resources, [
        createValidate,
        create
    ]);
}