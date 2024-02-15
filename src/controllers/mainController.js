const fs = require('fs');
const path = require('path');
const db = require('../database/models')

//let productosFilePath = path.join(__dirname, '../../data/products.json');
//let archivo = fs.readFileSync(productosFilePath, {encoding: 'utf-8'});
//let productos = JSON.parse(archivo);
//const producto = productos.map(producto => {
//    return producto;
//});
let mainController = {
    index: async (req, res) => {
        try{
            let productos = await db.Product.findAll({include: ['category', 'mark']})
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
        }
        catch(err){
            res.status(500).json({ error: "No se cargar la lista de productos" });
        }

    },
    search: async (req, res) => {
        try{
            let productos = await db.Product.findAll({include: ['category', 'mark']})
            let busqueda = req.query.busqueda;
            res.render('search', {title:'LC Supermercado', productos: productos,
             busqueda: busqueda, css:'css/search.css', user: req.session.user });                       
        }
        catch(err){
            res.status(500).json({ error: "No se pudo realizar la búsqueda de productos" });
        }

    },
}

module.exports = mainController;