/* eslint-disable quotes */
import {models} from 'mongoose';
import VoucherUserService from "../../services/VOUCHER/VoucherUser.service";

const {Vouchers} = models;

const listAllVoucherEmployee = (req, res) => {

    const voucherUserService = new VoucherUserService(req);

    return voucherUserService.verifyUser()
        .then(user => {
            if (user) {
                req.query.aggregate.push({
                        $match: {
                            userType: user._userType,
                            cpf: user.cpf
                        }
                    });

                return Vouchers
                    .paginate(req.query.aggregate, req.query.limit, req.query.page);
            }

            throw new Error('Users not found, not register voucher');
        })
        .then(result => {
            if (!result.data.length) return res.api.send(null, res.api.codes.NOT_FOUND);

            return res.api.send(result.data, res.api.codes.OK, {paginate: result.paginate});
        })
        .catch(err => {
            return res.api.send(err, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default listAllVoucherEmployee;