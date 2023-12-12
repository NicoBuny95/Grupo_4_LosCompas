const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require("../middlewares/multer");

router.get('/allProducts', productController.allProducts);
router.get('/productDetail/:id', productController.detalle);
router.get('/carrito', productController.carrito);
router.get('/addProduct', productController.addView);
router.post('/addProduct', uploadFile.single("image"), productController.addProduct);
router.get('/editProduct/:id', productController.editView)
router.put('/editProduct/:id', productController.editProduct)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.get('/prodByCategory/:category', productController.searchByCategory)
module.exports = router;