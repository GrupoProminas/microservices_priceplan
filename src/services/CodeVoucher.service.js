/* eslint-disable for-direction,newline-after-var,id-length,no-plusplus */
import {models} from 'mongoose';
const {Vouchers} = models;

class CodeVoucherService {

    static generateVoucher(charNumber, code = null) {
        this.code = code;
        this.charNumber = charNumber;

        if (this.code === null) {
            return this.getCode();
        }

        return this.verifyDup(this.code);
    }

    static getCode() {
        let code = '';
        const uidChar = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0; i < this.charNumber; i++) {
            code += uidChar.charAt(Math.floor(Math.random() * uidChar.length));
        }

        return this.verifyDup(code);
    }

    static verifyDup(code) {
        return Vouchers
            .findOne({
                code: code
            })
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
                throw new Error(err.message);
            });
    }
}

export default CodeVoucherService;