
const db = require('../database/models');
const { log, Console } = require("console");
const { validationResult } = require('express-validator');

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
      id: category.categories_id, 
      name: category.categories_description, 
      totalProducts: category.product.length 
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
      res.json(productsData); 
    })
    .catch(error => {
      console.error('Error al obtener todos los productos:', error);
      res.status(500).json({ error: 'Error al obtener todos los productos' });
    });
  },


  allProducts: (req, res) => {
    db.Product.findAll()
    .then(productsData => {

      res.render({user: req.session.user})
      res.json(productsData);
    })

  },

  detalle: (req, res) => {
    try {
      db.Product.findByPk(req.params.id, {include: ['category', 'mark']})
      .then(producto => {
        if (producto) {
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
        res.render("addProduct", {
          title: "Agregar producto",
          css: "/css/addProduct.css"
          , user: req.session.user, marcas: res.locals.marks, categorias: res.locals.categories });  
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
    try {
      const { name, marca, description, price, category, discount } = req.body;
      let newProduct = {
        products_name: name,
        marks_id: marca,
        products_description: description,
        products_price: price,
        categories_id: category,
        products_image: req.file.filename,
        products_discount: discount,
        products_active : 1,
      };

      await db.Product.create(newProduct)      
      res.redirect('/');
    } catch (err) {      
      res.send(err)
    }
  },

  editView: async(req, res) => {
    try {
      const productId = req.params.id;
      const productEdit = await db.Product.findByPk(productId);
      res.render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: productEdit,
        marcas: res.locals.marks,
        categorias: res.locals.categories,
        user: req.session.user 
      }); 
    } catch (err) {
      res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
  },
  editProduct: async(req, res) => {
    try {
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

      await db.Product.update(editProduct,{
        where:{
            products_id: req.params.id
        }
      })

      const productEdit = await db.Product.findByPk(req.params.id);
      res.render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: productEdit, 
        categorias: res.locals.categories,
        marcas: res.locals.marks,
        user: req.session.user })
    } catch (err) {
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
},

  deleteProduct: async(req, res) => {    
    try {
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
  },  

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

    res.status(200).json({ message: 'Carrito limpiado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
}
};

module.exports = productController;