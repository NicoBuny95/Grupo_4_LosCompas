const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validacionFormProduct');
const upload = require("../middlewares/multer");

const requireAuth = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
        res.render('login', { title: 'Login', css: '/css/login.css'});
    }
  };
router.get('/allProducts', productController.allProducts);
router.get('/allProductsJson', productController.allProductsJson);
router.get('/productDetail/:id', productController.detalle);
router.get('/carrito', requireAuth,productController.carrito);
router.get('/addcarrito/:id', productController.addToCart);
router.post('/addcarrito/:id', productController.addToCart);
router.delete('/removeCarrito/:id', productController.removeFromCart);
router.get('/addProduct',requireAuth, productController.addView);
router.post('/addProduct', upload.product.single("image"),validateProduct, productController.addProduct);
router.get('/editProduct/:id',requireAuth, productController.editView)
router.put('/editProduct/:id',requireAuth,upload.product.single("image"),validateProduct, productController.editProduct)
router.put('/editProductJson/:id',upload.product.single("image"), productController.editProductJson)
router.delete('/deleteProduct/:id', productController.deleteProduct)
router.delete('/deleteProductJson/:id', productController.deleteProductJson)
router.get('/prodByCategory/:category', productController.searchByCategory)
router.get('/Totals', productController.getDashboardTotals)
router.get('/TotalsByCategory', productController.CategoriesWithTotalProducts)
router.get('/LastProduct', productController.LastCreatedProduct)
module.exports = router;