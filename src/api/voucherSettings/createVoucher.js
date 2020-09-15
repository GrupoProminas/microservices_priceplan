import {models, Types} from 'mongoose';
import CodeVoucherService from '../../services/CodeVoucher.service';

const {Vouchers, Enrolments, VouchersConfigs} = models;

const createVoucher = async (req, res) => {

    try {

        const enrolment = await Enrolments.findById(req.params._id);

        if (!enrolment) return res.api.send("Aluno não está devidamente matriculado", res.api.codes.NO_CONTENT);

        const vouchersConfigs = await VouchersConfigs.findOne(
            {
                isActive: true
            }
        );

        if (!vouchersConfigs) return res.api.send([], res.api.codes.NO_CONTENT);

        const voucherType = vouchersConfigs.certifier.filter(_c => _c.name === enrolment.registryCourse.course._certifierName)
            .map(_c => _c.courseType)[0]
            .filter(_c => _c === enrolment.registryCourse.course._typeName);

        if (!voucherType || !voucherType[0]) return res.api.send([], res.api.codes.NO_CONTENT);

        const messages = vouchersConfigs.certifier.filter(_c => _c.name === enrolment.registryCourse.course._certifierName).map(_c => _c.description);


        let voucher = await Vouchers
            .findOne({
                    cpf: enrolment.cpf,
                    userType: 'student'
                },
                {
                    _id: 0,
                    usage: 1,
                    code: 1,
                    isActive: 1
                });

        const voucherElement = {
            tags: vouchersConfigs.tags,
            isActive: true,
            validateType: vouchersConfigs.validateType,
            usage: vouchersConfigs.limit,
            userType: 'student',
            cpf: enrolment.cpf,
            enrolment: vouchersConfigs.enrolment,
            course: vouchersConfigs.course,
            metadata: {
                isFree: vouchersConfigs.isFree,
                _enrolmentId: Types.ObjectId(req.params._id),
                description: messages[0]
            }
        }

        if (voucherElement.validateType === "period") {
            voucherElement.dateEnd = vouchersConfigs.dateEnd;
        }

        if (!voucher) {
            voucher = await CodeVoucherService.generateVoucher(6)
                .then(code => {
                    voucherElement.code = code;
                    return Vouchers.create(voucherElement);
                })
        }

        if (!voucher.isActive || voucher.usage <= 0)
            return res.api.send([], res.api.codes.NO_CONTENT);

        return res.api.send(voucher.code, res.api.codes.OK);
    } catch (err) {
        return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
    }
}

export default createVoucher;