const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/productDetail/:id', productController.detalle);
router.get('/carrito', productController.carrito);
router.get('/addProduct', productController.addProduct);
router.get('/editProduct/:id', productController.editProduct)

module.exports = router;