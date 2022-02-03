

const createProduct = (req, res) => {

const {Products} = req.models;


    Products
        .create(req.body)
        .then(prices => {
            return res.api.send(prices, res.api.codes.CREATED);
        })
        .catch(err => {
            return res.api.send(err.message, res.api.codes.INTERNAL_SERVER_ERROR);
        });
};

export default createProduct;