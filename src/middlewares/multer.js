const multer = require("multer");
const path = require("path");

// Configuración de multer
const storage = {
  // Configuración para archivos de productos
  products: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img/products");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    },
  }),

  // Configuración para archivos de perfil de usuario
  users: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img/users");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    },
  })
};

// Crear una instancia de multer con la configuración
const upload = {
  // Configuración para subir archivos de productos
  product: multer({ storage: storage.products }),

  // Configuración para subir archivos de perfil de usuario
  profile: multer({ storage: storage.users })
};

module.exports = upload;