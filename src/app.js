const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
//const PORT = 3001;
const PORT = process.env.PORT || 3001;
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const fs = require('fs');
// Configurar cookie parser
app.use(cookieParser());

// Configurar sesiones
app.use(session({
  secret: 'secretoNicolas', 
  resave: false,
  saveUninitialized: false
}));

const db = require('../src/database/models')

const requireAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Middleware para buscar la cookie y autenticar al usuario si existe y sus datos son correctos
app.use((req, res, next) => {
  const rememberUser = req.cookies.remember_user;

  if (rememberUser && !req.session.user) {
    const users = JSON.parse(fs.readFileSync("data/users.json"));
    const user = users.find(user => user.email === rememberUser);

    if (user) {
        req.session.user = user;
    }
  }

  next();
});

// Middleware para obtener información del usuario de la sesión
app.use((req, res, next) => {
  const user = req.session.user || null;
  res.locals.user = user;
  next();
});

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para obtener datos de productos y categorías
app.use(async (req, res, next) => {
  //res.locals.productsData = JSON.parse(fs.readFileSync("data/products.json"));
  //res.locals.categories = [...new Set(res.locals.productsData.map((product) => product.category))];
  res.locals.productsData = await db.Product.findAll();
  res.locals.categories = await db.Category.findAll();
  res.locals.variableTres = "Valor 3";
  next();
});

// Configurar carpeta de archivos estáticos
app.use(express.static("public"));

// Configurar método de override
app.use(methodOverride("_method"));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configurar rutas
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
