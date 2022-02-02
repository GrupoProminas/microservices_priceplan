import {Promise} from 'sequelize';
import CodeVoucherService from '../../services/CodeVoucher.service';


const createVoucher = async (req, res) => {
    const {Vouchers, Enrolments, VouchersConfigs} = req.models;

    const callGenerate = async (enrolment, vouchersConfigs, validCourse = null) => {

        const messages = vouchersConfigs.certifier.filter(_c => _c.name === enrolment.registryCourse.course._certifierName).map(_c => _c.description);

        const voucherElement = {
            tags: vouchersConfigs.tags,
            isActive: true,
            validateType: vouchersConfigs.validateType,
            usage: vouchersConfigs.maximunQuantity,
            userType: 'student',
            cpf: enrolment.cpf,
            enrolment: vouchersConfigs.enrolment,
            course: vouchersConfigs.course,
            metadata: {
                isFree: vouchersConfigs.isFree,
                _enrolmentId: enrolment._id,
                description: messages[0]
            }
        }

        if (validCourse) {
            voucherElement._courseId = validCourse._courseId;
            voucherElement.metadata._courseName = validCourse.name;
        }


        if (voucherElement.validateType === "period") {
            voucherElement.dateEnd = vouchersConfigs.dateEnd;
        }

        const code = await CodeVoucherService.generateVoucher(6, null, null, req.models);
        voucherElement.code = code;

        return Vouchers.create(voucherElement);

    }


    const QTD_COMBO_VOUCHERS = 3;

    try {

        const enrolment = await Enrolments.findById(req.params._id).lean();

        if (!enrolment) return res.api.send("Aluno não está devidamente matriculado", res.api.codes.NO_CONTENT);

        const vouchersConfigs = await VouchersConfigs.findOne(
            {
                isActive: true
            }
        ).lean();

        if (!vouchersConfigs) return res.api.send([], res.api.codes.NO_CONTENT);

        const voucherType = vouchersConfigs.certifier.filter(_c => _c.name === enrolment.registryCourse.course._certifierName)
            .map(_c => _c.courseType)[0]
            .filter(_c => _c === enrolment.registryCourse.course._typeName);

        if (!voucherType || !voucherType[0]) return res.api.send([], res.api.codes.NO_CONTENT);

        
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

        const certifierCoursesCombo = vouchersConfigs.comboCourses.find(_co => _co.certifier === enrolment.registryCourse.course._certifierName);
        if (!voucher) {
            let voucherPromise = [];
            if (enrolment.metadata && enrolment.metadata.combo) {
                
                for (let index = 0; index < QTD_COMBO_VOUCHERS; index++) {
                    const courseVoucher = certifierCoursesCombo.courses[index];
                    voucherPromise.push(callGenerate(enrolment, vouchersConfigs, courseVoucher));
                    
                }
            } else voucherPromise.push(callGenerate(enrolment, vouchersConfigs));

            const result = await Promise.all(voucherPromise);

            return res.api.send(result, res.api.codes.OK);

        }

        return res.api.send([], res.api.codes.NO_CONTENT);

    } catch (err) {
        return res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
    }
}

export default createVoucher;
