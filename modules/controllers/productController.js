const { HTTPCustomError } = require('../common/customError');
const productService = require('../services/productService');

//01.category list
const getCategory = async (req, res, next) => { 
    try {
        const categoryList = await productService.getCategory();
        return res.status(200).json(categoryList);
    } catch (err) {
        //console.log(err);
        return res.status(err.errorCode||500).json({ message: err.message });
    }
}

//02.product list
const getProducts = async (req, res, next) => { 
    try { 
        const productList = await productService.getProducts();
       
        return res.status(200).json(productList);
    } catch (err) { 
        console.log(err);
        return res.status(err.errorCode||500).json({ message: err.message });
    }
}

//03.product detail
const getProductDetail = async (req, res, next) => { 
    try { 
        const id = req.params.id;
        const productInfo = await productService.getProductDetail(id);

        return res.status(200).json(productInfo);
    } catch (err) { 
        console.log(err);
        return res.status(err.errorCode||500).json({ message: err.message });
    }
}
module.exports = {
    getCategory,
    getProducts,
    getProductDetail
}