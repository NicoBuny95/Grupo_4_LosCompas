const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const fs = require("fs");
const session = require("express-session");
const { body, validationResult } = require('express-validator');

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.locals.productsData = JSON.parse(fs.readFileSync("data/products.json"));
  res.locals.categories = [...new Set(res.locals.productsData.map((product) => product.category))];
  res.locals.variableTres = "Valor 3";

  next();
});
app.use(session({secret:"Secreto"}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
