/* eslint-disable no-plusplus,space-unary-ops,no-param-reassign,operator-assignment,no-extra-parens */
class DocValidator {

    constructor() {}

    static docValidate(doc) {

        doc.toString();
        doc.replace(/[^0-9]/g, '');

        switch (doc.length) {
            case 11:
                this.result = this.cpf(doc);
                break;
            case 14:
                this.result = this.cnpj(doc);
                break;
            default:
                return false;
        }

        return this.result;
    }

    static cpf(valor) {

        if (this.compareValues(valor, 11)) return false;

        const digitos = valor.substr(0, 9);

        let novoCpf = this.calcDigitosPosicoes(digitos);

        novoCpf = this.calcDigitosPosicoes(novoCpf, 11);

        if (novoCpf === valor) {
            return true;
        }

        return false;
    }

    static cnpj(valor) {

        if (this.compareValues(valor, 14)) return false;

        const cnpjOriginal = valor;

        const primeirosNumerosCnpj = valor.substr(0, 12);

        const primeiroCalculo = this.calcDigitosPosicoes(primeirosNumerosCnpj, 5);

        const segundoCalculo = this.calcDigitosPosicoes(primeiroCalculo, 6);

        if (segundoCalculo === cnpjOriginal) {
            return true;
        }

        return false;
    }

    static calcDigitosPosicoes(digitos, posicoes = 10, somaDigitos = 0) {

        for (let item = 0; item < digitos.length; item ++) {

            somaDigitos = somaDigitos + (digitos[item] * posicoes);

            posicoes--;

            if (posicoes < 2) {
                posicoes = 9;
            }
        }

        somaDigitos = somaDigitos % 11;

        if (somaDigitos < 2) {
            somaDigitos = 0;
        } else {
            somaDigitos = 11 - somaDigitos;
        }

        return digitos + somaDigitos;

    }

    static compareValues(doc, digitos) {
        const base = [];

        for (let item = 0; item <= 9; item ++) {
            base.push(new Array(digitos).fill(item)
                .join(''));
        }

        return base.includes(doc);
    }
}

export default DocValidator;