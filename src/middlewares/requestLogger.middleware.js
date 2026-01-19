import logger from '../config/logger.js';

const sanitizeBody = (body) => {
    if (!body || typeof body !== 'object') {
        return body;
    }

    const sensitiveFields = ['password', 'token', 'secret', 'authorization', 'credit_card'];
    const sanitized = {};

    for (const [key, value] of Object.entries(body)) {
        const lowerKey = key.toLowerCase();
        
        if (sensitiveFields.some(field => lowerKey.includes(field))) {
            sanitized[key] = '***REDACTED***';
        } 
        else if (value && typeof value === 'object' && !Array.isArray(value)) {
            sanitized[key] = sanitizeBody(value);
        }
        else if (Array.isArray(value)) {
            sanitized[key] = value.map(item => 
                typeof item === 'object' ? sanitizeBody(item) : item
            );
        }
        else {
            sanitized[key] = value;
        }
    }

    return sanitized;
};

export const requestLogger = (req, res, next) => {
    const start = Date.now();
    
    const requestInfo = {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent')
    };

    
    const debugInfo = { ...requestInfo };
    if (process.env.NODE_ENV !== 'production' && req.body) {
        debugInfo.body = sanitizeBody(req.body);
    }

    logger.debug('Incoming request', debugInfo);

    res.on('finish', () => {
        const duration = Date.now() - start;
        
        const logData = {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            contentLength: res.get('content-length') || 0,
            ip: req.ip
        };

        if (res.statusCode >= 500) {
            logger.error('Request failed with server error', logData);
        } else if (res.statusCode >= 400) {
            logger.warn('Request failed with client error', logData);
        } else {
            logger.info('Request completed', logData);
        }
    });

    next();
};