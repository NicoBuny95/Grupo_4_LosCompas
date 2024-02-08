const fs = require("fs");

let productController = {
  allProducts: (req, res) => {
    const productsData = JSON.parse(fs.readFileSync("data/products.json"));
    res.render({user: req.session.user},productsData)
  },

  detalle: (req, res) => {
    try {
      const productId = req.params.id;
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
    }
  },
  addView: (req, res) => {
    res.render("addProduct", {
      title: "Agregar producto",
      css: "/css/addProduct.css"
      , user: req.session.user });
  },
  addProduct: (req, res) => {
    try {
      const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      const { name, marca, description, price, category, descuento } = req.body;
      let newProduct = {
        id: productsData.length + 1,
        name,
        marca,
        description,
        price,
        category,
        image: req.file.filename,
        descuento,
      };

      productsData.push(newProduct);
      fs.writeFileSync("data/products.json", JSON.stringify(productsData, null, 2));

      res.render("addProduct", {
        title: "Agregar producto",
        css: "/css/addProduct.css",
        user: req.session.user 
      });
    } catch (err) {
      res.status(500).json({ error: "No se pudo crear el producto"  });
    }
  },

  editView: (req, res) => {
    try {
      const productId = req.params.id;
      const productsData = JSON.parse(fs.readFileSync("data/products.json")); // Verifica la ruta del archivo JSON
      let datosEditar = productsData.filter((e) => productId == e.id);
      //     const updatedProduct = req.body;
      //     const updatedProducts = productsData.map((product) => {
      //       if (product.id == productId) {
      //         return { ...product, ...updatedProduct };
      //       }
      //       return product;
      //     });
      //     fs.writeFileSync(
      //       "./data/products.json",
      //       JSON.stringify(updatedProducts, null, 2)
      //     );

      res.render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: datosEditar[0],
        user: req.session.user 
      }); // Usar updatedProduct en lugar de product
    } catch (err) {
      res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
  },
  editProduct: (req, res) => {
    try {
      const productId = req.params.id;
      const productsData = JSON.parse(fs.readFileSync("data/products.json")); // Verifica la ruta del archivo JSON
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
      res.status(200).render("editProduct", {
        title: "Editar producto",
        css: "/css/addProduct.css",
        productoE: updatedProduct,
        user: req.session.user 
      }); // Usar updatedProduct en lugar de product
    } catch (err) {
      res.status(500).json({ error: "No se pudo actualizar el producto" });
    }
  },

  deleteProduct: (req, res) => {
    try {
      const productId = req.params.id;
      const productsData = JSON.parse(fs.readFileSync("data/products.json"));
      const updatedProducts = productsData.filter((product) => product.id != productId);
      fs.writeFileSync("data/products.json", JSON.stringify(updatedProducts, null, 2));
      res.redirect("/");
    } catch (err) {
      res.status(500).json({ error: "No se pudo eliminar el producto" });
    }
  },

  carrito: (req, res) => {
    res.render("carrito", { title: "Carrito", css: "/css/carrito.css"  ,user: req.session.user });
  },

  searchByCategory: (req, res) => {
    try {
      const category = req.params.category;
      const productsData = JSON.parse(fs.readFileSync("data/products.json"));

      const filteredProducts = productsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );

      if (filteredProducts.length > 0) {
        res.render("listaProd", {
          title: `Productos en la categoría ${category}`,
          css: "/css/index.css",
          category: category,
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
};

module.exports = productController;
