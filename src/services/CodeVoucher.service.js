/* eslint-disable for-direction,newline-after-var,id-length,no-plusplus */
import {models} from 'mongoose';
const {Vouchers} = models;

class CodeVoucherService {

    static generateVoucher(charNumber, code = null, cpf = null) {
        this.code = code;
        this.charNumber = charNumber;

        if (this.code === null) {
            return this.getCode();
        }

        return this.verifyDup(this.code, cpf);
    }

    static getCode() {
        let code = '';
        const uidChar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0; i < this.charNumber; i++) {
            code += uidChar.charAt(Math.floor(Math.random() * uidChar.length));
        }

        return this.verifyDup(code);
    }

    static verifyDup(code, cpf) {
        const agg = {
            code: code
        }

        if(cpf) {
            Object.assign(agg, {cpf: cpf, userType: "partner"});
        }

        return Vouchers
            .findOne(agg)
            .then(result => {

                if (result !== null) {
                    if (this.code === null) {
                        return this.getCode();
                    }
                    throw new Error('The code is already registered!');
                }

                return code;
            })
            .catch(err => {
                console.log(err);
                throw new Error(err.message);
            });
    }
}

export default CodeVoucherService;