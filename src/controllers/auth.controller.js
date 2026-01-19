import * as authService from '../services/auth.service.js';
import logger from '../config/logger.js';
import { loginSchema } from '../validations/auth.schema.js';

export const loginUser = async (req, res, next) => {
    try {

        const { error } = loginSchema.validate(req.body);
        if (error) {
            logger.warn(`Validación fallida: ${error.message}`, {
                method: req.method,
                url: req.originalUrl
            });
            return res.status(400).json({ message: error.message });
        }

        const { username, password } = req.body;
        const user = await authService.validateUser(username, password);
        if (!user) {
            logger.warn(`Intento de login fallido para username: ${username}`);
            return res.status(401).json({ message: 'Usuario o contraseña incorrecta' });
        }
        const token = authService.generateToken(user);

        logger.info('Usuario logueado correctamente', {
            username: user.username,
            role: user.role
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        logger.error('Error en loginUser', { error: error.stack });
        next(error);
    }
};
