const fs = require('fs');
const path = require('path');

let productosFilePath = path.join(__dirname, '../../data/products.json');
let archivo = fs.readFileSync(productosFilePath, {encoding: 'utf-8'});
let productos = JSON.parse(archivo);
const producto = productos.map(producto => {
    return producto;
});



let mainController = {
    index: (req, res) => {
        
        let banner = [
            {
                name: "banner1",
                image: "banner1.jpg"
            },
            {
                name: "banner2",
                image: "banner2.jpg"
            },
            {
                name: "banner3",
                image: "banner3.jpg"
            }
        ]
        res.render('index', {title: 'LC Supermercado', 
        css:'css/index.css', products:productos,
         banner: banner , user: req.session.user });
    },
    search: (req, res) => {
        
        let busqueda = req.query.busqueda;
        res.render('search', {title:'LC Supermercado', productos: productos,
         busqueda: busqueda, css:'css/search.css', user: req.session.user });
    },
}

module.exports = mainController;