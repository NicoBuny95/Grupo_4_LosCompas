const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validacionFormProduct');
const upload = require("../middlewares/multer");

const requireAuth = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
        // res.render('login', { title: 'Login', css: '/css/login.css'});
        res.status(404).render('Error404');
    }
  };
router.get('/allProducts', productController.allProducts);
router.get('/productDetail/:id', productController.detalle);
router.get('/carrito', requireAuth,productController.carrito);
router.get('/addcarrito/:id', productController.addToCart);
router.post('/addcarrito/:id', productController.addToCart);
router.delete('/removeCarrito/:id', productController.removeFromCart);
router.get('/addProduct',requireAuth, productController.addView);
router.post('/addProduct', requireAuth,upload.product.single("image"),validateProduct, productController.addProduct);
router.get('/editProduct/:id',requireAuth, productController.editView)
router.put('/editProduct/:id',requireAuth,upload.product.single("image"),validateProduct, productController.editProduct)
router.delete('/deleteProduct/:id',requireAuth, productController.deleteProduct)
router.get('/prodByCategory/:category', productController.searchByCategory)
module.exports = router;