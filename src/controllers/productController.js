const productos = [{id: 1, name: 'Aceite Natura 900 ml',
description: 'Tipo de aceite para cocina: Girasol. Marca: Natura. Tipo de envase: Botella. Volumen de la unidad: 900 ml. Es libre de gluten. Con fecha de vencimiento',
image: 'home-aceite.webp', category: 'Aceites', price: '899.00',},
{id: 2, name: 'Leche Descremada La Serenisima 1 Lt',
description: 'Tipo de Lácteo: Leche Descremada Larga Vida. Marca: La Serenisima. Tipo de envase: Cartón. Volumen de la unidad: 1 Lt. Con fecha de vencimiento.',
image: 'leche-la-serenisima-larga-vida.png', category: 'Lácteos', price: '549.00',}]

let productController = {
    detalle: (req, res) => {
        let idProducto = req.params.id;
        let producto = productos.filter((prod) => {return prod.id == idProducto})
        res.render('detalle', {title: 'Detalle de producto', css: '/css/detalle.css', producto});
    },
    addProduct: (req, res) => {
        res.render('addProduct', {title: 'Agregar producto', css: '/css/addProduct.css'});
    },
    editProduct: (req, res) => {
        let idProductoE = req.params.id;
        let productoE = productos.filter((prodE) => {return prodE.id == idProductoE})
        res.render('editProduct', {title: 'Editar producto', css: '/css/addProduct.css', productoE: productoE});
    },
    carrito: (req, res) => {
        res.render('carrito', {title: 'Carrito', css:'/css/carrito.css'});
    }
}

module.exports = productController;