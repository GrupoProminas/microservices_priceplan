import {models, Types} from 'mongoose';

const {Vouchers, Enrolments, VouchersConfigs} = models;

const createVoucher = async (req, res) => {

    console.log(req)

    try {

        const enrolment = await Enrolments.findById(req.params._id);

        if(!enrolment) return res.api.send("Aluno não está devidamente matriculado", res.api.codes.NO_CONTENT);

        const vouchersConfigs = await VouchersConfigs.findOne(
            {
                    isActive: true,
                    validationDate: {$gte: new Date()},
                    courseType: enrolment.registryCourse.course._typeName,
                    "certifier.name": enrolment.registryCourse.course._certifierName,
                    maximunWorkload: {$lte: enrolment.registryCourse.course.workload}
            }
        );

        if(!vouchersConfigs) return res.api.send([], res.api.codes.NO_CONTENT);


        let voucher = await Vouchers
            .findOne({
                cpf: enrolment.cpf,
                userType: 'student',
                voucherType: 'course',
                amountType: 'percentage',
                amount: 100
            },
            {
                _id: 0,
                usage: 1,
                code: 1,
                isActive: 1
            });
        
        if(!voucher){
            voucher = await Vouchers.create({
            tags: [
                'Extensaão',
                'Faculdade Prominas',
                '60'
            ],
            isActive: true,
            voucherType: 'course',
            amountType: 'percentage',
            amount: 100,
            validateType: 'usage',
            usage: vouchersConfigs.maximunQuantity,
            code: 'Prominas' + Math.random().toString(36).substring(7),
            userType: 'student',
            cpf: enrolment.cpf,
            metadata: {isFree: vouchersConfigs.isFree, enrolment: Types.ObjectId(req.params._id)}
                })
        }

        if(!voucher.isActive || voucher.usage <= 0) 
            return res.api.send([], res.api.codes.NO_CONTENT);

        return res.api.send(voucher.code, res.api.codes.OK);
    }
    catch(err) {
        console.log(err);
        res.api.send(err.stack, res.api.codes.INTERNAL_SERVER_ERROR);
    }
}

export default createVoucher;