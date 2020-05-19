import create from './create';
import createValidate from './_validate/create.validate';
import reader from './reader';
import readOne from './readOne';
import updateValidade from './_validate/update.validade';
import updateVoucherSettings from './update';
import createVoucher from './createVoucher';

const resources = '/vouchersettings';

export default (route) => {
    // Rota para criar novo plano de cartão de crédito
    route.post(resources, [
        createValidate,
        create
    ]);
    route.get(`${resources}/create_voucher/:_id`, createVoucher);
    route.get(resources, [reader]);
    route.get(`${resources}/:_id`, [readOne]);
    route.put(`${resources}/:_id`, [
        updateValidade,
        updateVoucherSettings
    ]);
}