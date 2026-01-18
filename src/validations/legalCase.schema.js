import Joi from 'joi';

export const legalCaseSchema = Joi.object({
  case_number: Joi.string().trim().required().messages({
    'string.empty': 'El número de caso es obligatorio',
  }),
  plaintiff: Joi.string().trim().required().messages({
    'string.empty': 'El demandante es obligatorio',
  }),
  defendant: Joi.string().trim().required().messages({
    'string.empty': 'El demandado es obligatorio',
  }),
  case_type: Joi.string().valid('civil', 'criminal', 'labor', 'commercial').required(),
  description: Joi.string().trim().allow(''),
  lawyer_id: Joi.string().uuid().optional(),
});

export const assignCaseSchema = Joi.object({
  lawyer_id: Joi.string().uuid().required(),
});

export const transferCaseSchema = Joi.object({
  new_lawyer_id: Joi.string().uuid().required(),
});

