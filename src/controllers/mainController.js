const fs = require('fs');
const path = require('path');

let productosFilePath = path.join(__dirname, '../../data/products.json');
let archivo = fs.readFileSync(productosFilePath, {encoding: 'utf-8'});
let productos = JSON.parse(archivo);

let mainController = {
    index: (req, res) => {
        res.render('index', {title: 'LC Supermercado', css:'css/index.css', productos: productos});
    },
}

module.exports = mainController;