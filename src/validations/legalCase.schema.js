import Joi from 'joi';


export const createLegalCaseSchema = Joi.object({
    case_number: Joi.string()
        .trim()
        .uppercase() 
        .pattern(/^[A-Z0-9-]+$/) 
        .min(5)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El número de caso es obligatorio',
            'string.pattern.base': 'El número de caso solo puede contener letras mayúsculas, números y guiones (ej: CASE-2025-001)',
            'string.min': 'El número de caso debe tener al menos 5 caracteres',
            'string.max': 'El número de caso no puede superar los 50 caracteres',
            'any.required': 'El número de caso es obligatorio'
        }),
    
    plaintiff: Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required()
        .messages({
            'string.empty': 'El demandante es obligatorio',
            'string.min': 'El demandante debe tener al menos 3 caracteres',
            'string.max': 'El demandante no puede superar los 200 caracteres',
            'any.required': 'El demandante es obligatorio'
        }),
    
    defendant: Joi.string()
        .trim()
        .min(3)
        .max(200)
        .required()
        .messages({
            'string.empty': 'El demandado es obligatorio',
            'string.min': 'El demandado debe tener al menos 3 caracteres',
            'string.max': 'El demandado no puede superar los 200 caracteres',
            'any.required': 'El demandado es obligatorio'
        }),
    
    case_type: Joi.string()
        .valid('civil', 'criminal', 'labor', 'commercial')
        .required()
        .messages({
            'any.only': 'El tipo de caso debe ser: civil, criminal, labor o commercial',
            'any.required': 'El tipo de caso es obligatorio'
        }),
    
    status: Joi.string()
        .valid('pending', 'assigned', 'in_progress', 'resolved')
        .default('pending')
        .messages({
            'any.only': 'El estado debe ser: pending, assigned, in_progress o resolved'
        }),
    
    description: Joi.string()
        .trim()
        .max(1000)
        .allow('', null)
        .optional()
        .messages({
            'string.max': 'La descripción no puede superar los 1000 caracteres'
        }),
    
    lawyer_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .allow(null)
        .optional()
        .messages({
            'string.guid': 'El ID del abogado debe ser un UUID válido'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});



export const listLegalCasesSchema = Joi.object({
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
        .valid('pending', 'assigned', 'in_progress', 'resolved')
        .optional()
        .messages({
            'any.only': 'El estado debe ser: pending, assigned, in_progress o resolved'
        }),
    
    case_type: Joi.string()
        .valid('civil', 'criminal', 'labor', 'commercial')
        .optional()
        .messages({
            'any.only': 'El tipo de caso debe ser: civil, criminal, labor o commercial'
        }),
    
    lawyer_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .optional()
        .messages({
            'string.guid': 'El ID del abogado debe ser un UUID válido'
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


export const legalCaseIdSchema = Joi.object({
    id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.guid': 'El ID debe ser un UUID válido',
            'any.required': 'El ID del caso es obligatorio'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});


export const assignCaseSchema = Joi.object({
    lawyer_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.guid': 'El ID del abogado debe ser un UUID válido',
            'string.empty': 'El ID del abogado es obligatorio',
            'any.required': 'El ID del abogado es obligatorio'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});

export const transferCaseSchema = Joi.object({
    new_lawyer_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'string.guid': 'El ID del nuevo abogado debe ser un UUID válido',
            'string.empty': 'El ID del nuevo abogado es obligatorio',
            'any.required': 'El ID del nuevo abogado es obligatorio'
        })
}).options({
    stripUnknown: true,
    abortEarly: false
});


export default {
    createLegalCaseSchema,
    listLegalCasesSchema,
    legalCaseIdSchema,
    assignCaseSchema,
    transferCaseSchema
};