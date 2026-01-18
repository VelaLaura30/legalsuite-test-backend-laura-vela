import Joi from 'joi';

export const loginSchema = Joi.object({
    username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'El usuario es obligatorio',
            'string.alphanum': 'El usuario solo puede contener letras y números',
            'string.min': 'El usuario debe tener al menos 3 caracteres',
            'string.max': 'El usuario no puede superar los 30 caracteres',
            'any.required': 'El usuario es obligatorio'
        })
    ,
    password: Joi.string()
        .trim()
        .min(6)
        .max(50)
        .required()
        .messages({
            'string.empty': 'La contraseña es obligatoria',
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.max': 'La contraseña no puede superar los 50 caracteres',
            'any.required': 'La contraseña es obligatoria'
        })
    ,
});
