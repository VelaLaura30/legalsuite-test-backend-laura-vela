
import Joi from 'joi';

export const lawyerReportParamsSchema = Joi.object({
    id: Joi.string()
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



export default {
    lawyerReportParamsSchema,
};