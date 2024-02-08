const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require("../middlewares/multer");


const requireAuth = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  };
router.get('/allProducts', productController.allProducts);
router.get('/productDetail/:id', productController.detalle);
router.get('/carrito', requireAuth,productController.carrito);
router.get('/addProduct',requireAuth, productController.addView);
router.post('/addProduct', requireAuth,upload.product.single("image"), productController.addProduct);
router.get('/editProduct/:id',requireAuth, productController.editView)
router.put('/editProduct/:id',requireAuth, productController.editProduct)
router.delete('/deleteProduct/:id',requireAuth, productController.deleteProduct)
router.get('/prodByCategory/:category', productController.searchByCategory)
module.exports = router;