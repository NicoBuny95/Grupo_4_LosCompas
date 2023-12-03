const fs = require('fs');
const path = require('path');

let productosFilePath = path.join(__dirname, '../../data/products.json');
let archivo = fs.readFileSync(productosFilePath, {encoding: 'utf-8'});
let productos = JSON.parse(archivo);

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
        res.render('index', {title: 'LC Supermercado', css:'css/index.css', productos: productos, banner: banner});
    },
}

module.exports = mainController;