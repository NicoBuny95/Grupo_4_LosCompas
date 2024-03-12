const { check } = require('express-validator');
const db = require('../database/models'); 




const validateLogin = [
    check('email')
                     .notEmpty().withMessage('El correo electrónico es obligatorio')
                     .isEmail().withMessage('El correo electrónico debe ser válido')
                     .custom(async (value) => {
                         // Buscar un usuario con el correo electrónico proporcionado
                         const user = await db.User.findOne({ where: { users_email: value } });
                         
                         if (!user) {
                             throw new Error('El correo electrónico no se encuentra registrado');
                         }
                     }),
    check('password').notEmpty().withMessage('La contraseña es obligatoria')
                     .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                     .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),        
];

module.exports = validateLogin;