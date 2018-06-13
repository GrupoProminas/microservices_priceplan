/* eslint-disable id-length */
import {models} from 'mongoose';
const {Products} = models;

const createProducts = (req, res) => {

    // Create new products by req.body data
    Products
        .create(req.body)
        .then(products => {
            return res.api.send(products, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        })
};

export default createProducts;