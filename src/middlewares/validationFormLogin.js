const { check, validationResult } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcrypt');

// const validateLogin = [
//   check('email')
//     .notEmpty().withMessage('El correo electrónico es obligatorio')
//     .isEmail().withMessage('El correo electrónico debe ser válido')
//     .custom(async (value) => {
//       try {
//         // Buscar el usuario en la base de datos
//         const user = await db.User.findOne({ where: { users_email: value } });
//         if (!user) {
//           throw new Error('El correo electrónico no pertenece a un usuario registrado');
//         }
//         return true;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     }),
//   check('password')
//     .notEmpty().withMessage('La contraseña es obligatoria')
//     .custom(async (value, { req }) => {
//       try {
//         // Buscar el usuario en la base de datos
//         const user = await db.User.findOne({ where: { users_email: req.body.email } });
//         if (!user) {
//           throw new Error('La contraseña proporcionada no es valida para este usuario');
//         }
//         // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
//         const passwordMatch = await bcrypt.compare(value, user.users_password);
//         if (!passwordMatch) {
//           throw new Error('La contraseña no es correcta');
//         }
        
//         req.user = user;
//         return true;
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     })
// ];

// module.exports = validateLogin;
const validateLogin = [
  check('email')
    .notEmpty().withMessage('El correo electrónico y la contraseña son obligatorios')
    .isEmail().withMessage('El correo electrónico debe ser válido')
    .custom(async (value) => {
      try {
     
        const user = await db.User.findOne({ where: { users_email: value } });
        if (!user ) {
          throw new Error('El correo electrónico o la contraseña no son válidos');
        }

        if (!user.users_active) {
          throw new Error('El usuario está inactivo');
        }
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
  check('password')
    .notEmpty().withMessage('El correo electrónico y la contraseña son obligatorios')
    .custom(async (value, { req }) => {
      try {
      
        const user = await db.User.findOne({ where: { users_email: req.body.email } });
        if (!user ) {
          throw new Error('El correo electrónico o la contraseña no son válidos');
        }

        if (!user.users_active) {
          throw new Error('Este usuario se encuentra inactivo');
        }
       
        const passwordMatch = await bcrypt.compare(value, user.users_password);
        if (!passwordMatch) {
          throw new Error('El correo electrónico o la contraseña no son válidos');
        }
        req.user = user;
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    })
];

module.exports = validateLogin;
