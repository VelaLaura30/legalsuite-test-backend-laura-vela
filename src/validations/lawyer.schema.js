import Joi from 'joi';

export const createLawyerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'El nombre del abogado es obligatorio',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no puede superar los 100 caracteres',
            'any.required': 'El nombre del abogado es obligatorio'
        }),
    
    email: Joi.string()
        .trim()
        .lowercase() 
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.empty': 'El email es obligatorio',
            'string.email': 'El email debe tener un formato válido',
            'any.required': 'El email es obligatorio'
        }),
    
    phone: Joi.string()
        .trim()
        .pattern(/^\+?[\d\s-]{7,20}$/) 
        .allow('', null)
        .optional()
        .messages({
            'string.pattern.base': 'El teléfono debe tener un formato válido (ej: +57 300 123 4567)'
        }),
    
    specialization: Joi.string()
        .trim()
        .max(100)
        .allow('', null)
        .optional()
        .messages({
            'string.max': 'La especialización no puede superar los 100 caracteres'
        }),
    
    status: Joi.string()
        .valid('active', 'inactive')
        .default('active')
        .messages({
            'any.only': 'El status debe ser "active" o "inactive"'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});



export const listLawyersSchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .messages({
            'number.base': 'La página debe ser un número',
            'number.integer': 'La página debe ser un número entero',
            'number.min': 'La página debe ser mayor o igual a 1'
        }),
    
    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .messages({
            'number.base': 'El límite debe ser un número',
            'number.integer': 'El límite debe ser un número entero',
            'number.min': 'El límite debe ser al menos 1',
            'number.max': 'El límite no puede superar 100'
        }),
    
    status: Joi.string()
        .valid('active', 'inactive')
        .optional()
        .messages({
            'any.only': 'El status debe ser "active" o "inactive"'
        }),
    
    search: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'La búsqueda debe tener al menos 2 caracteres',
            'string.max': 'La búsqueda no puede superar los 50 caracteres'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});


export const lawyerIdSchema = Joi.object({
    id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.guid': 'El ID debe ser un UUID válido',
            'any.required': 'El ID del abogado es obligatorio'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});


export default {
    createLawyerSchema,
    listLawyersSchema,
    lawyerIdSchema
};