import Joi from 'joi';

export const lawyerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'El nombre del abogado es obligatorio'
  }),
  email: Joi.string().trim().email().required().messages({
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido'
  }),
  phone: Joi.string().trim().allow(''),
  specialization: Joi.string().trim().allow(''),
  status: Joi.string().valid('active', 'inactive').default('active').messages({
    'any.only': 'El status debe ser "active" o "inactive"'
  }),
});
