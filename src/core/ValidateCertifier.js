/**
 * Use this class for all methods that manage certifiers
 **/

const validateCertifier = (req, res, next) => {
    const certifiers = [
        {
            alias: 'universidade-candido-mendes',
            name : 'Universidade Candido Mendes'
        },
        {
            alias: 'faculdade-unica',
            name : 'Faculdade ÚNICA'
        },
        {
            alias: 'faculdade-prominas',
            name : 'Faculdade Prominas'
        }
    ];

    const certifier = certifiers.find(_c => _c.alias === req.params.certifier);

    if (certifier) {
        req.params.certifier = certifier.name;

        return next();
    }

    return res.api.send('certifier_not_found', res.api.codes.NOT_FOUND);
};

export default validateCertifier;