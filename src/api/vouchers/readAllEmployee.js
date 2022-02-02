/* eslint-disable quotes */
import VoucherUserService from "../../services/VOUCHER/VoucherUser.service";


const listAllVoucherEmployee = (req, res) => {

const {Vouchers} = req.models;


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
