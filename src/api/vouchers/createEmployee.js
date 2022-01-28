/* eslint-disable id-length,quotes,prefer-destructuring */
import CodeVoucherService from "../../services/CodeVoucher.service";
import VoucherUserService from "../../services/VOUCHER/VoucherUser.service";

const createVoucherEmployee = (req, res) => {

const {Vouchers} = req.models;

    let code = null;

    if ('code' in req.body) {
        code = req.body.code;
    }

    const voucherUserService = new VoucherUserService(req);

    return CodeVoucherService.generateVoucher(6, code, null, req.models)
        .then(generateCode => {
            req.body.code = generateCode;

            return voucherUserService.verifyUser();
        })
        .then(user => {
            if (user) {
                req.body.userType = user._userType;
                req.body.cpf = user.cpf;

                return Vouchers
                    .create(req.body);
            }

            throw new Error('Users not found, not register voucher');
        })
        .then(result => {
            return res.api.send(result, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createVoucherEmployee;
