const { check } = require('express-validator');
const db = require('../database/models'); 

const validateProductRegistration = [    
    check('name').notEmpty().withMessage('El nombre de producto es obligatorio')
                    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').notEmpty().withMessage('La descripción del producto es obligatoria')
                    .isLength({ min: 20 }).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    check('image')
                    .custom((value, { req }) => {
                        if (!req.file || !req.file.mimetype.startsWith('image/')) {
                            throw new Error('El producto debe tener una imagen válida');
                        }
                        return true;
                    })                 
];

module.exports = validateProductRegistration;