const { HTTPCustomError } = require('../common/customError');
const productDao = require('../models/productDao');

const getCategory = async () => { 
    return await productDao.getCategory();
}
const getProducts = async () => { 
    return await productDao.getProducts();
}

const getProductDetail = async (id) => {
    return await productDao.getProductById(id);
 }
module.exports = {
    getCategory,
    getProducts,
    getProductDetail
}