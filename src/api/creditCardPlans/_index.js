// Joi Validate
import createValidade from './_validates/create.validate';
import updateValidade from './_validates/update.validate';

// Example Middleware
import create from './create';
import read from './read';
import readOne from './readOne';
import update from './update';
import readByCertifier from './readbyCertifier';
import readProduct from './readProduct';

const resources = '/credit_card_plan';

export default (route) => {

    // Rota para criar novo plano de cartão de crédito
    route.post(resources, [
        createValidade,
        create
    ]);

    // Rota para atualizar plano de cartão de crédito
    route.put(resources + '/:_id', [
        updateValidade,
        update
    ]);

    // Rota para ler todos os planos de cartão de crédito
    route.get(resources, read);

    // Rota para ler todos os planos de cartão de crédito
    route.get(`${resources}/readbycertifiers/:certifier/:_typeName/:total`, readByCertifier);

    //Rota para ler todos os planos de produtos
    route.get(`${resources}/readproduct/:total`, readProduct);

    // Rota para ler um plano de cartão de crédito
    route.get(resources + '/:_id', readOne);
};