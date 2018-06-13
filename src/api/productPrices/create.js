/* eslint-disable id-length */
import {models} from 'mongoose';
const {ProductPrices} = models;


const createProductPrices = (req, res) => {

    // Create new productPrices by req.body data
    ProductPrices
        .create(req.body)
        .then(productPrices => {
            return res.api.send(productPrices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createProductPrices;