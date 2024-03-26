//const fs = require("fs");
const db = require('../database/models');
const { log, Console } = require("console");
const { validationResult } = require('express-validator');

//async function categorias() {return cat = await db.Category.findAll()};
//async function marcas () {return  mar = await db.Mark.findAll()};

let productController = {

  getDashboardTotals: async (req, res) => {
    try {
       
        const totalProducts = await db.Product.count();
        const totalUsers = await db.User.count();
        const totalCategories = await db.Category.count();

        res.json([
            { title: 'Total de productos', quantity: totalProducts },
            { title: 'Total de usuarios', quantity: totalUsers },
            { title: 'Total de categorías', quantity: totalCategories }
        ]);
    } catch (error) {
        console.error('Error al obtener los totales del dashboard:', error);
        res.status(500).json({ error: 'Error al obtener los totales del dashboard' });
    }
},


CategoriesWithTotalProducts: async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      include: [{
        model: db.Product,
        attributes: ['products_id'],
        as: 'product' // Así se llama la asociación en el modelo Category
      }]
    });

    const categoriesWithTotalProducts = categories.map(category => ({
      id: category.categories_id, // Usamos categories_id para el ID de la categoría
      name: category.categories_description, // Usamos categories_description para el nombre de la categoría
      totalProducts: category.product.length // Usamos product para acceder a la asociación definida en el modelo Category
    }));

    res.json(categoriesWithTotalProducts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías con el total de productos" });
  }
},

LastCreatedProduct: async (req, res) => {
  try {
      const lastProduct = await db.Product.findOne({
          order: [['products_created_at', 'DESC']]
      });

      res.json(lastProduct);
  } catch (error) {
      res.status(500).json({ error: "Error al obtener el último producto creado" });
  }
},

allProductsJson: (req, res) => {
  db.Product.findAll()
    .then(productsData => {
      res.json(productsData); // Cambiado a res.json() para enviar datos JSON
    })
    .catch(error => {
      console.error('Error al obtener todos los productos:', error);
      res.status(500).json({ error: 'Error al obtener todos los productos' });
    });
  },


  allProducts: (req, res) => {
    //const productsData = JSON.parse(fs.readFileSync("data/products.json"));
    //res.render({user: req.session.user},productsData)
    db.Product.findAll()
    .then(productsData => {

      res.render({user: req.session.user})
      res.json(productsData);
    })

  },

  detalle: (req, res) => {
    try {
    /*const productId = req.params.id;
      const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      const product = productsData.find((product) => product.id == productId);
      if (product) {
        res.render("detalle", {
          title: "Detalle Producto",
          css: "/css/detalle.css",
          product: product, user: req.session.user 
        });
      } else {
        res.status(404).send("Producto no encontrado");
      }
    } catch (err) {
      res.status(500).json({ error: "No se pudo obtener el producto" , user: req.session.user  });
    }*/

      db.Product.findByPk(req.params.id, {include: ['category', 'mark']})
      .then(producto => {
        if (producto) {
          //res.render('moviesDetail.ejs', {movie});

          res.render("detalle", {
            title: "Detalle Producto",
            css: "/css/detalle.css",
            product: producto, user: req.session.user 
          });
        } else {
          res.status(404).send("Producto no encontrado");
        }          
      });
    } catch (err) {
      res.status(500).json({ error: "No se pudo obtener el producto" , user: req.session.user  });
    }
  },
  addView: (req, res) => {
    //db.Mark.findAll()
    //.then(marcas => {
    //  db.Category.findAll()
    //  .then(categorias =>{
        res.render("addProduct", {
          title: "Agregar producto",
          css: "/css/addProduct.css"
          , user: req.session.user, marcas: res.locals.marks, categorias: res.locals.categories });  
    //  })
    //})
  },
  addProduct: async (req, res) => {

    //Se capturán los errores y se renderiza en nuevamente pasando la lista de errores 
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      console.log("Mapped: ", resultValidation.mapped())
      return res.render("addProduct", {
        title: "Agregar producto",
        css: "/css/addProduct.css",
        user: req.session.user,
        marcas: res.locals.marks,
        categorias: res.locals.categories,
        errors: resultValidation.mapped(),
        oldData: req.body
       });
    }

    //Se guarda el nuevo producto en la base de datos
    try {
      //const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      const { name, marca, description, price, category, discount } = req.body;
      let newProduct = {
        //id: productsData.length + 1,
        products_name: name,
        marks_id: marca,
        products_description: description,
        products_price: price,
        categories_id: category,
        products_image: req.file.filename,
        products_discount: discount,
        products_active : 1,
      };

    /*  productsData.push(newProduct);
      fs.writeFileSync("data/products.json", JSON.stringify(productsData, null, 2));
    */
      await db.Product.create(newProduct)      
      res.redirect('/');
    } catch (err) {      
      //res.status(500).json({ error: "No se pudo crear el producto"  });
      res.send(err)
    }
  },

  editView: async(req, res) => {
    try {
      const productId = req.params.id;
      //const productsData = JSON.parse(fs.readFileSync("data/products.json")); // Verifica la ruta del archivo JSON
      //let datosEditar = productsData.filter((e) => productId == e.id);
      const productEdit = await db.Product.findByPk(productId);
      //const categorias = await db.Category.findAll();
      //const marcas = await db.Mark.findAll();
      res.render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: productEdit,
        marcas: res.locals.marks,
        categorias: res.locals.categories,
        user: req.session.user 
      }); // Usar updatedProduct en lugar de product
    } catch (err) {
      res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
  },
  editProduct: async(req, res) => {
    try {
      //const productId = req.params.id;
      /*const productsData = JSON.parse(fs.readFileSync("data/products.json")); // Verifica la ruta del archivo JSON
      const updatedProduct = req.body;
      const updatedProducts = productsData.map((product) => {
        if (product.id == productId) {
          for (const key in updatedProduct) {
            if (updatedProduct.hasOwnProperty(key) && updatedProduct[key] !== "") {
              product[key] = updatedProduct[key];
            }
          }
        }
        return product;
      });
      fs.writeFileSync("./data/products.json", JSON.stringify(updatedProducts, null, 2));
      */
      const { name, marca, description, price, category, discount } = req.body;
      console.log(req.filename);

        let editProduct = {
          products_name: name,
          marks_id: marca,
          products_description: description,
          products_price: price,
          categories_id: category,          
          products_discount: discount,    
        }

    
      //res.render (req.file)
      await db.Product.update(editProduct,{
        where:{
            products_id: req.params.id
        }
      })
      /*res.status(200).render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: editProduct,
        user: req.session.user 

      }); // Usar updatedProduct en lugar de product*/
      const productEdit = await db.Product.findByPk(req.params.id);
      res.render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: productEdit, 
        categorias: res.locals.categories,
        marcas: res.locals.marks,
        user: req.session.user })
    } catch (err) {
      //res.status(500).json({ error: "No se pudo actualizar el producto" });
      res.render(err);
    }
  },


  editProductJson: async (req, res) => {
    try {
        const { name, marca, description, price, category, discount } = req.body;

        let editProduct = {
            products_name: name,
            marks_id: marca,
            products_description: description,
            products_price: price,
            categories_id: category,
            products_discount: discount,
        }

        await db.Product.update(editProduct, {
            where: {
                products_id: req.params.id
            }
        });

        const updatedProduct = await db.Product.findByPk(req.params.id);

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, error: "No se pudo actualizar el producto" });
    }
}
,

  deleteProduct: async(req, res) => {    
    try {
      
      //const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      //const updatedProducts = productsData.filter((product) => product.id != productId);
      //fs.writeFileSync("data/products.json", JSON.stringify(updatedProducts, null, 2));
      await db.Product.destroy({
        where:{
            products_id: req.params.id
        }
    })    
    res.redirect('/');
    } catch (err) {
      res.status(500).json({ error: "No se pudo eliminar el producto" });
    }
  },


  deleteProductJson: async(req, res) => {    
    try {
        await db.Product.destroy({
            where: {
                products_id: req.params.id
            }
        });
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "No se pudo eliminar el producto" });
    }
},

  carrito: (req, res) => {
    if (req.session.cart && req.session.cart.length > 0) {
    res.render("carrito", { title: "Mi Carrito", css: "/css/carrito.css", 
    cart: req.session.cart, user: req.session.user });
    } else{
      res.render('carrito', {title: "Mi Carrito", css: "/css/carrito.css", cart: null , user: req.session.user});
    }
  },

  searchByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      //const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      //const filteredProducts = productsData.filter(
      //  (product) => product.category.toLowerCase() === category.toLowerCase()
      //);
      const filteredProducts = await db.Product.findAll({
        where: {
          categories_id : category
        }
      })
      const categoryDescription = await db.Category.findByPk(category);
      if (filteredProducts.length > 0) {
        res.render("listaProd", {
          title: `Productos en la categoría ${categoryDescription.categories_description}`,
          css: "/css/index.css",
          category: categoryDescription.categories_description,
          products: filteredProducts, 
          user: req.session.user 
        });
      } else {
        res.status(404).send(`No hay productos en la categoría ${category}`);
      }
    } catch (err) {
      res.status(500).json({ error: "No se pudo realizar la búsqueda" });
    }
  },

  addToCart: async (req, res) => {
    try {
      const productId = req.params.id; // Obtener el ID del producto a agregar
      // Verificar si el producto está en el carrito
      if (!req.session.cart) {
        req.session.cart = [];
      }
  
      const productIndex = req.session.cart.findIndex(item => item.products_id === productId);
      if (productIndex !== -1) {
        // Si el producto ya está en el carrito, redirigir a la página del carrito
        return res.redirect('/carrito');
      }
  

      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }
  
      req.session.cart.push(product);
  
      // Redirigir a la página del carrito
      res.render("carrito", { title: "Mi Carrito", css: "/css/carrito.css", cart: req.session.cart, user: req.session.user });
    } catch (err) {
      res.status(500).json({ error: "No se pudo agregar el producto al carrito" });
    }
  }
,  

  
removeFromCart: (req, res) => {
  try {
    const productId = req.params.id;
    const cart = req.session.cart;
 
    req.session.cart = cart.filter(item => item.products_id == productId);

    // Respuesta exitosa
    res.render("carrito", { title: "Mi Carrito", css: "/css/carrito.css", cart: req.session.cart, user: req.session.user });
  } catch (err) {
    // Manejar errores
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
},

clearCart: (req, res) => {
  try {
    // Limpiar todo el carrito
    req.session.cart = [];

    // Respuesta exitosa
    res.status(200).json({ message: 'Carrito limpiado correctamente' });
  } catch (err) {
    // Manejar errores
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
}

};

module.exports = productController;