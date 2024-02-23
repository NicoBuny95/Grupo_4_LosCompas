const { check } = require('express-validator');
const db = require('../database/models'); 




const validateUserRegistration = [
    check('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('firstName').notEmpty().withMessage('El nombre es obligatorio')
                      .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    check('lastName').notEmpty().withMessage('El apellido es obligatorio')
                     .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    check('email')
                     .notEmpty().withMessage('El correo electrónico es obligatorio')
                     .isEmail().withMessage('El correo electrónico debe ser válido')
                     .custom(async (value) => {
                         // Buscar un usuario con el correo electrónico proporcionado
                         const user = await db.User.findOne({ where: { users_email: value } });
                         
                         if (user) {
                             throw new Error('El correo electrónico ya está registrado');
                         }
                     }),
    check('password').notEmpty().withMessage('La contraseña es obligatoria')
                     .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                     .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),
     check('profileImage')
                     .custom((value, { req }) => {
                         if (!req.file || !req.file.mimetype.startsWith('image/')) {
                             throw new Error('Debes subir una imagen válida');
                         }
                         return true;
                     })
                 
];

module.exports = validateUserRegistration;
