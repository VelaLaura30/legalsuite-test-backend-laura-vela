
import logger from '../config/logger.js';

export const errorHandler = (err, req, res, next) => {
    
    const errorInfo = {
        message: err.message,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: process.env.NODE_ENV !== 'production' ? req.body : undefined,
        userId: req.user?.id, 
    };

    
    const statusCode = err.statusCode || err.status || 500;

    
    if (statusCode >= 500) {
        logger.error('Server error', {
            ...errorInfo,
            statusCode,
            errorName: err.name
        });
    } else if (statusCode >= 400) {
        logger.warn('Client error', {
            ...errorInfo,
            statusCode,
            errorName: err.name
        });
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        ...(process.env.NODE_ENV !== 'production')
    });
};