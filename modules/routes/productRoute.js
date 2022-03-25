const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/category', productController.getCategory);
router.get('', productController.getProducts);
router.get('/:id', productController.getProductDetail);
module.exports = router;