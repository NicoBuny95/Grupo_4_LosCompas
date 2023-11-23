let productController = {
    detalle: (req, res) => {
        res.render('detalle', {title: 'Detalle de producto', css: '/css/detalle.css'});
    },
    carrito: (req, res) => {
        res.render('carrito', {title: 'Carrito', css:'/css/carrito.css'});
    }
}

module.exports = productController;