const { check, validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcrypt');

const validateLogin = [
  check('email')
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .custom(async (value) => {
      try {
        // Buscar el usuario en la base de datos
        const user = await db.User.findOne({ where: { users_email: value } });
        if (!user) {
          throw new Error('El correo electrónico no se encuentra registrado');
        }
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .custom(async (value, { req }) => {
      try {
        // Buscar el usuario en la base de datos
        const user = await db.User.findOne({ where: { users_email: req.body.email } });
        if (!user) {
          throw new Error('El correo electrónico no se encuentra registrado');
        }
        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(value, user.users_password);
        if (!passwordMatch) {
          throw new Error('La contraseña no es correcta');
        }
        
        req.user = user;
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    })
];

module.exports = validateLogin;
