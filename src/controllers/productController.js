let productController = {
    detalle: (req, res) => {
        res.render('detalle');
    },
    carrito: (req, res) => {
        res.render('carrito');
    }
}

module.exports = productController;