const { check } = require('express-validator');
const db = require('../database/models'); 

const validateProductRegistration = [    
    check('name').notEmpty().withMessage('El nombre de producto es obligatorio')
                    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description').notEmpty().withMessage('La descripción del producto es obligatoria')
                    .isLength({ min: 20 }).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    check('price').notEmpty().withMessage('El precio del producto es obligatorio')
                .isNumeric().withMessage('El campo precio debe ser numérico'),
    check('discount').isNumeric().withMessage('El campo descuento debe ser numérico'),
    check('marca').isInt({min: 1}).withMessage('Se debe seleccionar una marca para el producto'),
    check('category').isInt({min: 0}).withMessage('Debe seleccionar una categoría para el producto'),
    check('image')
                    .custom((value, { req }) => {
                        if (!req.file || !req.file.mimetype.startsWith('image/')) {
                            throw new Error('El producto debe tener una imagen válida');
                        }
                        return true;
                    })                 
];

module.exports = validateProductRegistration;