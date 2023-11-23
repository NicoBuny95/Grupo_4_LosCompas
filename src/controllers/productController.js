const productos = [{id: 1, name: 'Aceite Natura 900 ml',
description: 'Tipo de aceite para cocina: Girasol. Marca: Natura. Tipo de envase: Botella. Volumen de la unidad: 900 ml. Es libre de gluten. Con fecha de vencimiento',
image: 'home-aceite.webp', category: 'Aceites', price: '899.00',}]
let productController = {
    detalle: (req, res) => {
        let idProducto = req.params.id;
        let producto = productos.filter((prod) => {return prod.id == idProducto})
        res.render('detalle', {title: 'Detalle de producto', css: '/css/detalle.css', producto});

    },
    addProduct: (req, res) => {
        res.render('addProduct', {title: 'Agregar producto', css: '/css/detalle.css'});
    },
    carrito: (req, res) => {
        res.render('carrito', {title: 'Carrito', css:'/css/carrito.css'});
    }
}

module.exports = productController;